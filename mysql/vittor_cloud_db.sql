-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 02, 2021 at 06:14 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vittor_cloud`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `action_access` int(11) NOT NULL COMMENT '1-team lead, 2-employee, 3-both'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `action_access`) VALUES
(1, 'hemali@gmail.com', 'hemali123', 'Hemali', 'HR', 0),
(2, 'sumita@gmail.com', 'sumita123', 'Sumita', 'Manager', 3),
(3, 'vishal@gmail.com', 'vishal123', 'Vishal', 'Employee', 0),
(4, 'hiten@gmail.com', 'hiten123', 'hiten', 'Team Lead', 2),
(5, 'pooja@gmail.com', 'pooja123', 'Pooja', 'HR', 0),
(6, 'hiral@gmail.com', 'hiral123', 'Hiral', 'Manager', 1),
(7, 'aplesh@gmail.com', 'alpesh123', 'Apesh', 'Employee', 0),
(8, 'heena@gmail.com', 'heena123', 'Heena', 'Team Lead', 2),
(9, 'riddhi@gmail.com', 'riddhi123', 'Riddhi', 'HR', 0),
(10, 'pratik@gmail.com', 'pratik123', 'Pratik', 'Manager', 2),
(11, 'rahesh@gmail.com', 'rajesh123', 'Rajesh', 'Employee', 0),
(12, 'mital@gmail.com', 'mital123', 'Mital', 'Team Lead', 0),
(13, 'soniya@gmail.com', 'soniya123', 'Soniya', 'HR', 0),
(14, 'mohit@gmail.com', 'mohitk123', 'Mohit', 'Manager', 0),
(15, 'pinal@gmail.com', 'pinal123', 'Pinal', 'Employee', 0),
(16, 'shivani@gmail.com', 'shivani123', 'Shivani', 'Team Lead', 0),
(17, 'prachi@gmail.com', 'prachii123', 'Prachi', 'HR', 0),
(18, 'ajay@gmail.com', 'ajay123', 'Ajay', 'Manager', 0),
(19, 'hetal@gmail.com', 'hetal123', 'Hetal', 'Employee', 0),
(20, 'brijesh@gmail.com', 'brijesh123', 'Brijesh', 'Team Lead', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
