<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once 'config.php'; 


header('Content-Type: application/json');

try {
    // Get raw POST data 
    $input = file_get_contents('php://input');
    // Decode JSON input to an associative array
    $user_answers = json_decode($input, true);

    // Check if user answers are valid 
    if (!is_array($user_answers)) {
        
        error_log("Invalid JSON input received: " . $input);
        echo json_encode(['status' => 'error', 'message' => 'Invalid input data or JSON parse error. Raw input: ' . htmlspecialchars($input)]);
        exit();
    }

    $eligible_schemes = [];

    // Fetch all schemes from databse
    $schemes_sql = "SELECT id, scheme_name_en, scheme_name_hi, scheme_name_mr,
                           description_en, description_hi, description_mr,
                           benefits_en, benefits_hi, benefits_mr,
                           application_link
                    FROM schemes";
    $schemes_result = $conn->query($schemes_sql);

    if ($schemes_result === FALSE) {
        throw new Exception("Error fetching schemes: " . $conn->error);
    }

    if ($schemes_result->num_rows > 0) {
        // each scheme to check eligibility
        while ($scheme = $schemes_result->fetch_assoc()) {
            $scheme_id = $scheme['id'];
            $is_eligible = true; 

            // Fetch criteria for the current scheme
            $criteria_sql = "SELECT criteria_key, operator, value FROM eligibility_criteria WHERE scheme_id = ?";
            $criteria_stmt = $conn->prepare($criteria_sql);

            if ($criteria_stmt === FALSE) {
                throw new Exception("Error preparing criteria statement: " . $conn->error);
            }

            $criteria_stmt->bind_param("i", $scheme_id);
            $criteria_stmt->execute();
            $criteria_result = $criteria_stmt->get_result();

            // If a scheme has no criteria means everyone is eligible
            if ($criteria_result->num_rows == 0) {
                $is_eligible = true; 
            } else {
                
                while ($criterion = $criteria_result->fetch_assoc()) {
                    $key = $criterion['criteria_key'];
                    $operator = $criterion['operator'];
                    $expected_value = $criterion['value'];

                    // Get the user's answer for this criterion key
                    
                    $user_answer = isset($user_answers[$key]) ? strtolower(trim($user_answers[$key])) : null;

                    // If user didn't provide an answer for a required criterion, they are not eligible
                    if ($user_answer === null) {
                        $is_eligible = false;
                        break; 
                    }

                    
                    switch ($operator) {
                        case 'equals':
                            if (is_numeric($user_answer) && is_numeric($expected_value)) {
                                if (floatval($user_answer) != floatval($expected_value)) {
                                    $is_eligible = false;
                                }
                            } else {
                                if ($user_answer != strtolower(trim($expected_value))) {
                                    $is_eligible = false;
                                }
                            }
                            break;
                        case 'not_equals':
                            if (is_numeric($user_answer) && is_numeric($expected_value)) {
                                if (floatval($user_answer) == floatval($expected_value)) {
                                    $is_eligible = false;
                                }
                            } else {
                                if ($user_answer == strtolower(trim($expected_value))) {
                                    $is_eligible = false;
                                }
                            }
                            break;
                        case 'greater_than':
                            if (!is_numeric($user_answer) || !is_numeric($expected_value) || floatval($user_answer) <= floatval($expected_value)) {
                                $is_eligible = false;
                            }
                            break;
                        case 'less_than':
                            if (!is_numeric($user_answer) || !is_numeric($expected_value) || floatval($user_answer) >= floatval($expected_value)) {
                                $is_eligible = false;
                            }
                            break;
                        case 'between':
                            $range = explode('-', $expected_value);
                            if (count($range) === 2 && is_numeric($range[0]) && is_numeric($range[1]) && is_numeric($user_answer)) {
                                if (!(floatval($user_answer) >= floatval($range[0]) && floatval($user_answer) <= floatval($range[1]))) {
                                    $is_eligible = false;
                                }
                            } else {
                                $is_eligible = false;
                            }
                            break;
                        case 'in_list':
                            $expected_values_array = array_map('strtolower', array_map('trim', explode(',', $expected_value)));
                            if (!in_array($user_answer, $expected_values_array)) {
                                $is_eligible = false;
                            }
                            break;
                        case 'not_in_list':
                            $expected_values_array = array_map('strtolower', array_map('trim', explode(',', $expected_value)));
                            if (in_array($user_answer, $expected_values_array)) {
                                $is_eligible = false;
                            }
                            break;
                        case 'is_true': 
                            if ($user_answer !== 'yes') {
                                $is_eligible = false;
                            }
                            break;
                        case 'is_false': 
                            if ($user_answer !== 'no') {
                                $is_eligible = false;
                            }
                            break;
                        default:
                            $is_eligible = false;
                            break;
                    }

                    if (!$is_eligible) {
                        break; 
                    }
                }
            }
            $criteria_stmt->close(); 

            
            if ($is_eligible) {
                $eligible_schemes[] = $scheme;
            }
        }
    }

    
    echo json_encode(['status' => 'success', 'eligible_schemes' => $eligible_schemes]);

} catch (Exception $e) {
    
    error_log("Server-side error in process_eligibility.php: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'An internal server error occurred: ' . $e->getMessage()]);
} finally {
    
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>