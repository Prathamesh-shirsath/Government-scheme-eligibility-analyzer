-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2025 at 08:23 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scheme_finder_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `eligibility_criteria`
--

CREATE TABLE `eligibility_criteria` (
  `id` int(11) NOT NULL,
  `scheme_id` int(11) NOT NULL,
  `criteria_key` varchar(100) NOT NULL,
  `operator` enum('equals','not_equals','greater_than','less_than','between','in_list','not_in_list','is_true','is_false') NOT NULL,
  `value` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eligibility_criteria`
--

INSERT INTO `eligibility_criteria` (`id`, `scheme_id`, `criteria_key`, `operator`, `value`) VALUES
(1, 1, 'age', 'greater_than', '10'),
(2, 6, 'age', 'greater_than', '21'),
(3, 7, 'bpl', 'is_true', ''),
(4, 7, 'bpl', 'is_true', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `eligibility_criteria`
--
ALTER TABLE `eligibility_criteria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `scheme_id` (`scheme_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `eligibility_criteria`
--
ALTER TABLE `eligibility_criteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `eligibility_criteria`
--
ALTER TABLE `eligibility_criteria`
  ADD CONSTRAINT `eligibility_criteria_ibfk_1` FOREIGN KEY (`scheme_id`) REFERENCES `schemes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
