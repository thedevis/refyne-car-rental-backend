# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.23)
# Database: car_rental_system
# Generation Time: 2021-08-05 05:51:55 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table bookings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `car_id` int(11) unsigned DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `booking_datetime_start` timestamp NULL DEFAULT NULL,
  `booking_datetime_end` timestamp NULL DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `rm_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_car_id_fk` (`car_id`),
  KEY `booking_user_fk` (`user_id`),
  CONSTRAINT `booking_car_id_fk` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `booking_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table car
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car`;

CREATE TABLE `car` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `car_license_number` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `manufacturer` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `model` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `base_price` int(11) NOT NULL,
  `security` int(11) NOT NULL,
  `currency` enum('INR','USD') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'INR',
  `rm_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1' COMMENT '1=>active,0=>deleted',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `car_license_number` (`car_license_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mobile_number` varchar(11) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `salt` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_number` (`mobile_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `mobile_number`, `name`, `password`, `salt`, `status`, `createdAt`, `updatedAt`)
VALUES
	(1,'8860279717','Praveen','$argon2i$v=19$m=4096,t=3,p=1$q8LRPDVHVUa4s5kMGdqdqxGLgXwMNxKUk9olxo/TAoo$yfFpru1Mnc/NhzzUUiwNGK1Zpsc2sE3GVwn+cAK3P6k','abc2d13c35475546b8b3990c19da9dab118b817c0c37129493da25c68fd3028a',0,'2021-08-05 00:07:22','2021-08-05 11:20:30');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
