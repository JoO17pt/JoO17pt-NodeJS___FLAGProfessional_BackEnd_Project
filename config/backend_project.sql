-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: backend_project
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Technology','technology.jpg','2022-11-27 16:12:44','2022-11-27 16:12:44'),(3,'Vehicles','vehicles.jpg','2022-11-27 16:12:44','2022-11-27 16:12:44'),(4,'Fashion','fashion.jpg','2022-11-27 16:12:44','2022-11-27 16:12:44'),(5,'Home','home.jpg','2022-11-27 16:12:44','2022-11-27 16:12:44'),(6,'Sports','sports.jpg','2022-11-27 16:12:44','2022-11-27 16:12:44'),(7,'Culture','culture.jpg','2022-11-27 16:12:44','2022-11-27 16:12:44'),(8,'Others','others.jpg','2022-11-27 16:12:44','2022-11-27 16:12:44');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dealProducts`
--

DROP TABLE IF EXISTS `dealProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dealProducts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `dealId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dealId` (`dealId`),
  KEY `productId` (`productId`),
  CONSTRAINT `dealProducts_ibfk_1` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `dealProducts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealProducts`
--

LOCK TABLES `dealProducts` WRITE;
/*!40000 ALTER TABLE `dealProducts` DISABLE KEYS */;
INSERT INTO `dealProducts` VALUES (49,'2022-11-27 22:10:51','2022-11-27 22:10:51',20,94),(50,'2022-11-27 22:10:51','2022-11-27 22:10:51',20,96),(51,'2022-11-27 22:11:16','2022-11-27 22:11:16',21,72),(52,'2022-11-27 22:11:16','2022-11-27 22:11:16',21,70),(53,'2022-11-27 22:11:16','2022-11-27 22:11:16',21,77),(54,'2022-11-27 22:12:52','2022-11-27 22:12:52',22,78),(55,'2022-11-27 22:12:52','2022-11-27 22:12:52',22,102),(56,'2022-11-27 22:12:52','2022-11-27 22:12:52',22,52),(57,'2022-11-27 22:14:32','2022-11-27 22:14:32',23,73),(58,'2022-11-27 22:14:32','2022-11-27 22:14:32',23,76),(59,'2022-11-27 22:14:32','2022-11-27 22:14:32',23,79),(60,'2022-11-27 22:15:59','2022-11-27 22:15:59',24,89),(61,'2022-11-27 22:15:59','2022-11-27 22:15:59',24,92),(62,'2022-11-27 22:17:26','2022-11-27 22:17:26',25,81),(63,'2022-11-27 22:17:26','2022-11-27 22:17:26',25,54),(64,'2022-11-27 22:17:26','2022-11-27 22:17:26',25,53),(65,'2022-11-27 22:17:26','2022-11-27 22:17:26',25,102),(66,'2022-11-27 22:18:40','2022-11-27 22:18:40',26,68),(67,'2022-11-27 22:18:40','2022-11-27 22:18:40',26,73),(68,'2022-11-27 22:19:13','2022-11-27 22:19:13',27,82),(69,'2022-11-27 22:19:13','2022-11-27 22:19:13',27,85),(70,'2022-11-27 22:21:20','2022-11-27 22:21:20',28,58),(71,'2022-11-27 22:21:20','2022-11-27 22:21:20',28,60),(72,'2022-11-27 22:21:58','2022-11-27 22:21:58',29,83),(73,'2022-11-27 22:21:58','2022-11-27 22:21:58',29,64),(74,'2022-11-27 22:21:58','2022-11-27 22:21:58',29,48),(75,'2022-11-27 22:23:01','2022-11-27 22:23:01',30,84),(76,'2022-11-27 22:23:01','2022-11-27 22:23:01',30,32),(77,'2022-11-27 22:23:01','2022-11-27 22:23:01',30,98),(78,'2022-11-27 22:24:49','2022-11-27 22:24:49',31,59),(79,'2022-11-27 22:24:49','2022-11-27 22:24:49',31,87),(80,'2022-11-27 22:26:32','2022-11-27 22:26:32',32,86),(81,'2022-11-27 22:26:32','2022-11-27 22:26:32',32,67),(82,'2022-11-27 22:28:13','2022-11-27 22:28:13',33,27),(83,'2022-11-27 22:28:13','2022-11-27 22:28:13',33,26),(84,'2022-11-27 22:28:13','2022-11-27 22:28:13',33,46),(85,'2022-11-27 22:29:16','2022-11-27 22:29:16',34,28),(86,'2022-11-27 22:29:16','2022-11-27 22:29:16',34,34),(87,'2022-11-27 22:30:15','2022-11-27 22:30:15',35,61),(88,'2022-11-27 22:30:15','2022-11-27 22:30:15',35,65),(89,'2022-11-27 22:31:16','2022-11-27 22:31:16',36,35),(90,'2022-11-27 22:31:16','2022-11-27 22:31:16',36,94),(91,'2022-11-27 22:31:16','2022-11-27 22:31:16',36,36),(92,'2022-11-27 22:32:15','2022-11-27 22:32:15',37,99),(93,'2022-11-27 22:32:15','2022-11-27 22:32:15',37,81),(94,'2022-11-27 22:32:15','2022-11-27 22:32:15',37,96),(95,'2022-11-27 22:32:53','2022-11-27 22:32:53',38,38),(96,'2022-11-27 22:32:53','2022-11-27 22:32:53',38,47),(97,'2022-11-27 22:32:53','2022-11-27 22:32:53',38,46),(98,'2022-11-27 22:33:56','2022-11-27 22:33:56',39,63),(99,'2022-11-27 22:33:56','2022-11-27 22:33:56',39,80),(100,'2022-11-27 22:33:56','2022-11-27 22:33:56',39,87),(101,'2022-11-27 22:34:54','2022-11-27 22:34:54',40,45),(102,'2022-11-27 22:34:54','2022-11-27 22:34:54',40,44),(103,'2022-11-27 22:34:54','2022-11-27 22:34:54',40,50),(104,'2022-11-27 22:37:10','2022-11-27 22:37:10',41,101),(105,'2022-11-27 22:37:10','2022-11-27 22:37:10',41,69),(106,'2022-11-27 22:37:40','2022-11-27 22:37:40',42,49),(107,'2022-11-27 22:37:40','2022-11-27 22:37:40',42,30),(108,'2022-11-27 22:39:25','2022-11-27 22:39:25',43,54),(109,'2022-11-27 22:39:25','2022-11-27 22:39:25',43,26);
/*!40000 ALTER TABLE `dealProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dealUsers`
--

DROP TABLE IF EXISTS `dealUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dealUsers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rate` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `dealId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dealUsers_dealId_userId_unique` (`userId`,`dealId`),
  KEY `dealId` (`dealId`),
  CONSTRAINT `dealUsers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `dealUsers_ibfk_2` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealUsers`
--

LOCK TABLES `dealUsers` WRITE;
/*!40000 ALTER TABLE `dealUsers` DISABLE KEYS */;
INSERT INTO `dealUsers` VALUES (39,NULL,'2022-11-27 22:10:51','2022-11-27 22:10:51',6,20),(40,NULL,'2022-11-27 22:10:51','2022-11-27 22:10:51',10,20),(41,3,'2022-11-27 22:11:16','2022-11-27 22:25:29',6,21),(42,NULL,'2022-11-27 22:11:16','2022-11-27 22:11:16',15,21),(43,4,'2022-11-27 22:12:52','2022-11-27 22:38:31',7,22),(44,NULL,'2022-11-27 22:12:52','2022-11-27 22:12:52',25,22),(45,NULL,'2022-11-27 22:14:32','2022-11-27 22:14:32',8,23),(46,NULL,'2022-11-27 22:14:32','2022-11-27 22:14:32',14,23),(47,5,'2022-11-27 22:15:59','2022-11-27 22:25:45',9,24),(48,NULL,'2022-11-27 22:15:59','2022-11-27 22:15:59',15,24),(49,NULL,'2022-11-27 22:17:26','2022-11-27 22:17:26',10,25),(50,NULL,'2022-11-27 22:17:26','2022-11-27 22:17:26',25,25),(51,4,'2022-11-27 22:18:40','2022-11-27 22:19:45',11,26),(52,3,'2022-11-27 22:18:40','2022-11-27 22:20:17',8,26),(53,4,'2022-11-27 22:19:13','2022-11-27 22:23:43',11,27),(54,NULL,'2022-11-27 22:19:13','2022-11-27 22:19:13',14,27),(55,2,'2022-11-27 22:21:20','2022-11-27 22:27:05',12,28),(56,NULL,'2022-11-27 22:21:20','2022-11-27 22:21:20',16,28),(57,5,'2022-11-27 22:21:58','2022-11-27 22:35:56',12,29),(58,NULL,'2022-11-27 22:21:58','2022-11-27 22:21:58',23,29),(59,4,'2022-11-27 22:23:01','2022-11-27 22:29:50',13,30),(60,NULL,'2022-11-27 22:23:01','2022-11-27 22:23:01',18,30),(61,NULL,'2022-11-27 22:24:49','2022-11-27 22:24:49',14,31),(62,NULL,'2022-11-27 22:24:49','2022-11-27 22:24:49',21,31),(63,NULL,'2022-11-27 22:26:32','2022-11-27 22:26:32',15,32),(64,NULL,'2022-11-27 22:26:32','2022-11-27 22:26:32',9,32),(65,NULL,'2022-11-27 22:28:12','2022-11-27 22:28:12',16,33),(66,NULL,'2022-11-27 22:28:12','2022-11-27 22:28:12',23,33),(67,NULL,'2022-11-27 22:29:16','2022-11-27 22:29:16',17,34),(68,NULL,'2022-11-27 22:29:16','2022-11-27 22:29:16',19,34),(69,2,'2022-11-27 22:30:15','2022-11-27 22:38:45',18,35),(70,NULL,'2022-11-27 22:30:15','2022-11-27 22:30:15',25,35),(71,NULL,'2022-11-27 22:31:16','2022-11-27 22:31:16',19,36),(72,NULL,'2022-11-27 22:31:16','2022-11-27 22:31:16',6,36),(73,NULL,'2022-11-27 22:32:15','2022-11-27 22:32:15',20,37),(74,NULL,'2022-11-27 22:32:15','2022-11-27 22:32:15',10,37),(75,5,'2022-11-27 22:32:53','2022-11-27 22:35:34',20,38),(76,NULL,'2022-11-27 22:32:53','2022-11-27 22:32:53',23,38),(77,NULL,'2022-11-27 22:33:56','2022-11-27 22:33:56',21,39),(78,NULL,'2022-11-27 22:33:56','2022-11-27 22:33:56',9,39),(79,4,'2022-11-27 22:34:54','2022-11-27 22:36:31',22,40),(80,NULL,'2022-11-27 22:34:54','2022-11-27 22:34:54',24,40),(81,NULL,'2022-11-27 22:37:10','2022-11-27 22:37:10',24,41),(82,NULL,'2022-11-27 22:37:10','2022-11-27 22:37:10',13,41),(83,NULL,'2022-11-27 22:37:40','2022-11-27 22:37:40',24,42),(84,NULL,'2022-11-27 22:37:40','2022-11-27 22:37:40',17,42),(85,NULL,'2022-11-27 22:39:25','2022-11-27 22:39:25',25,43),(86,NULL,'2022-11-27 22:39:25','2022-11-27 22:39:25',16,43);
/*!40000 ALTER TABLE `dealUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deals`
--

DROP TABLE IF EXISTS `deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL,
  `owner` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
INSERT INTO `deals` VALUES (20,'Canceled',6,'2022-11-27 22:10:51','2022-11-27 22:16:36'),(21,'Closed',6,'2022-11-27 22:11:16','2022-11-27 22:25:23'),(22,'Closed',7,'2022-11-27 22:12:52','2022-11-27 22:38:27'),(23,'Canceled',8,'2022-11-27 22:14:32','2022-11-27 22:19:39'),(24,'Closed',9,'2022-11-27 22:15:59','2022-11-27 22:25:38'),(25,'Canceled',10,'2022-11-27 22:17:26','2022-11-27 22:38:18'),(26,'Closed',11,'2022-11-27 22:18:40','2022-11-27 22:19:38'),(27,'Closed',11,'2022-11-27 22:19:13','2022-11-27 22:23:37'),(28,'Closed',12,'2022-11-27 22:21:20','2022-11-27 22:26:59'),(29,'Closed',12,'2022-11-27 22:21:58','2022-11-27 22:35:46'),(30,'Closed',13,'2022-11-27 22:23:01','2022-11-27 22:29:44'),(31,'Canceled',14,'2022-11-27 22:24:49','2022-11-27 22:33:20'),(32,'Open',15,'2022-11-27 22:26:31','2022-11-27 22:26:31'),(33,'Canceled',16,'2022-11-27 22:28:12','2022-11-27 22:35:29'),(34,'Canceled',17,'2022-11-27 22:29:16','2022-11-27 22:30:47'),(35,'Closed',18,'2022-11-27 22:30:15','2022-11-27 22:38:38'),(36,'Open',19,'2022-11-27 22:31:16','2022-11-27 22:31:16'),(37,'Open',20,'2022-11-27 22:32:15','2022-11-27 22:32:15'),(38,'Closed',20,'2022-11-27 22:32:53','2022-11-27 22:35:29'),(39,'Open',21,'2022-11-27 22:33:55','2022-11-27 22:33:55'),(40,'Closed',22,'2022-11-27 22:34:54','2022-11-27 22:36:26'),(41,'Open',24,'2022-11-27 22:37:10','2022-11-27 22:37:10'),(42,'Open',24,'2022-11-27 22:37:40','2022-11-27 22:37:40'),(43,'Open',25,'2022-11-27 22:39:25','2022-11-27 22:39:25');
/*!40000 ALTER TABLE `deals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messageUsers`
--

DROP TABLE IF EXISTS `messageUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messageUsers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `messageId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `messageUsers_messageId_userId_unique` (`userId`,`messageId`),
  KEY `messageId` (`messageId`),
  CONSTRAINT `messageUsers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messageUsers_ibfk_2` FOREIGN KEY (`messageId`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messageUsers`
--

LOCK TABLES `messageUsers` WRITE;
/*!40000 ALTER TABLE `messageUsers` DISABLE KEYS */;
/*!40000 ALTER TABLE `messageUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `owner` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (25,'Turtleneck sweater','Only used a few times, washed','uZNQt9Ds96pEA2nC50y3i7ZnxJlIOp.jpeg',0,'2022-11-27 17:00:50','2022-11-27 17:40:18',16,4),(26,'T-shirt com padrão sapatilhas','T-shirt como nova, usada 1 vez. Tamanho único larga','fopctijsInN2KGC4QUpVOki0jIWfyN.jpeg',1,'2022-11-27 17:02:14','2022-11-27 17:02:14',16,4),(27,'Shirts Massimo Dutti','Only used a few times','u65Xp7XguvjUoOwA5U01lPinSGYLdM.jpeg',1,'2022-11-27 17:03:15','2022-11-27 17:03:15',16,4),(28,'Malha vermelha/bordeaux Stradivarius','Em bom estado','oMAI3tsB3ihk3AIoSCnU5z7Q1vKIML.jpeg',1,'2022-11-27 17:05:01','2022-11-27 17:05:01',17,4),(29,'Calças de fato de treino','Calças de fato de treino','JxUM5uqnaXRXYP8FDB4lEDmDlIjNzn.jpeg',1,'2022-11-27 17:05:45','2022-11-27 17:05:45',17,4),(30,'Vestido de veludo da Zara','Usado mas em bom estado. Vestido de veludo azul, com brilhantes multicores (visíveis apenas com certas luzes). Quentinho e com fecho de correr nas costas.','WVbJhoGon1b3Y4H8bOmg9Ha9Nqk4uz.jpeg',1,'2022-11-27 17:07:08','2022-11-27 17:07:08',17,4),(31,'Vestido bershka','Usado uma vez. Muito bonito e tem abertura no decote. Ele é preto e bege claro. Mais comprido um pouco do que na fotografia.','dC35zQruEijcSV5yXNp8bhSuJVlY6P.jpeg',1,'2022-11-27 17:09:37','2022-11-27 17:09:37',18,4),(32,'Casaco SMF','Usado poucas vezes','rqIxTfn3Z0Km6D1nD3d9lplHdJRFrV.jpeg',0,'2022-11-27 17:10:38','2022-11-27 22:29:44',18,4),(33,'Jumper','Cool patterned jumper','nRBSJZ7rXNZfPcp65df087H1zmeRZm.jpeg',1,'2022-11-27 17:11:55','2022-11-27 17:11:55',18,4),(34,'Fluffy Biscotti Color Jumper','Size S','UxDaPCjrgV8wc5YLd2HYeHs5ULw2C1.jpeg',1,'2022-11-27 17:13:22','2022-11-27 17:13:22',19,4),(35,'Colete cinzento da Tiffosi','Nunca foi usado','6vi5e3JKEe19LBWIwOvX54iq7h7Uxi.jpeg',1,'2022-11-27 17:14:11','2022-11-27 17:14:11',19,4),(36,'Casaco preto mango bastante quentinho','Como novo','42vsJXJWjGKvN3Ei7ovt5zZrGjsMJz.jpeg',1,'2022-11-27 17:15:12','2022-11-27 17:15:12',19,4),(37,'Casaco','Em muito bom estado.','XE7Nb8WSQ932emuGXBSCvDLLnSXkRx.jpeg',1,'2022-11-27 17:17:02','2022-11-27 17:17:02',20,4),(38,'Casaco - Sobretudo',' Tamanho único. Nunca usado.','DpZdsCINxAOcjqmseErLRUPiMTJk6k.jpeg',0,'2022-11-27 17:18:06','2022-11-27 22:35:29',20,4),(39,'Calças levi’s pretas 28-30','calças levi’s pretas, bolsos alterados pq os originais eram feios, ótimo estado usadas 2x max. Tamanho 28-30','TTFYo6I38q3Gmk4yCe9wjjuzpkRcOQ.jpeg',1,'2022-11-27 17:19:15','2022-11-27 17:19:15',20,4),(40,'brown sweater','worn 1 time. perfect condition. warm and comfortable','zrpVON7MJmQgzB0udxz3Gb6m2Z0mem.jpeg',1,'2022-11-27 17:20:37','2022-11-27 17:20:37',21,4),(41,'Oversized ZARA blazer','2019 collection. Worn 3 times Fits oversized','ZAbr65qVkRY8d3xbHoYJ4shhUY3OIs.jpeg',1,'2022-11-27 17:21:53','2022-11-27 17:21:53',21,4),(42,'Jeans Flare Pimkie','Como novas, foram usadas duas vezes.','J1rVsRHogZ8zvbe040PTjohQyLB7Jy.jpeg',1,'2022-11-27 17:23:00','2022-11-27 17:23:00',21,4),(43,'Velvet Sexy dress','Velvet sexy dress perfect for end of the year festivities. Unique Size ,fits perfectly a L','6HCwEdjqOraTlNZQyPZvTckKenLwi0.jpeg',1,'2022-11-27 17:25:32','2022-11-27 17:25:32',22,4),(44,'Conjunto camisola e casaco de malha','Em rosa bebé com bordado inglês e botões dourados.','BuAydPxgIsLIwlBOrdQfJnpfGwrBti.jpeg',0,'2022-11-27 17:26:35','2022-11-27 22:36:26',22,4),(45,'Calções Vintage Levi’s','Foram apertados atrás','MkIWcNrxjtZP2DMGcpHJSEz8YJmKhF.jpeg',0,'2022-11-27 17:27:28','2022-11-27 22:36:26',22,4),(46,'Fato de treino rosa','Fato de treino rosa','LGP96azGrtVMt0GM7lo8LrcjX203Y3.jpeg',0,'2022-11-27 17:29:02','2022-11-27 22:35:29',23,4),(47,'Casaco Primark','Casaco Primark rosa em pêlo com fecho e bolsos tam.xs','TFYndIdt3x49og1Uk5VdEaw7bzUsiB.jpeg',0,'2022-11-27 17:30:22','2022-11-27 22:35:29',23,4),(48,'Casaco Amarelo da Bershka','Usado 1 vez. Canadiana. Amarela cm capuz. Tamanho S Bershka','zdFbH5CpXf1LO6Aw7D87fgmMxE4eST.jpeg',0,'2022-11-27 17:31:43','2022-11-27 22:35:46',23,4),(49,'Camisa colorida','Camisa colorida','1b8RSdkB132MHvLx6d7tX9jWdUPj2X.jpeg',1,'2022-11-27 17:33:03','2022-11-27 17:33:03',24,4),(50,'Vestido Lança Perfume','Vestido com manga boca de sono, veste justo realçando a silhueta. Veste tamanho M. Muito pouco uso.','4PTPCqpqYZD0dnW97GM18JSpvFZMik.jpeg',0,'2022-11-27 17:33:52','2022-11-27 22:36:26',24,4),(51,'Camisola malha','Camisola malha rosa','jIV3zQHas2FFQtDHgqWiu6AOSp2JA8.jpeg',1,'2022-11-27 17:35:10','2022-11-27 17:35:10',24,4),(52,'Dunk low green white39','Artículo nunca usado ni utilizado, estado nuevo 10/10. No lo dude si tiene alguna pregunta, el precio es negociable dentro de lo razonable.','YHXRY5Y5kqj7Nn2NwkdhDArL1XqGbH.jpeg',0,'2022-11-27 17:37:30','2022-11-27 22:38:27',25,4),(53,'Streep trui Sissy Boy','Hele mooie streep trui van Sissy Boy in prachtige kleurstelling. In zeer goede staat! Er staat XS in het label maar het is toch echt een M!','LTwDMCnawcnG49CzpVCj9zjtuV1Uek.jpeg',1,'2022-11-27 17:38:38','2022-11-27 17:38:38',25,4),(54,'T-shirt creme print','T-shirt creme print','jAYvpiX8TswijZQoQDyYavhS1bCNs3.jpeg',1,'2022-11-27 17:39:34','2022-11-27 17:39:34',25,4),(55,'Mobília de quarto: cama, cómoda e secretária','Cama com 2,05m x 0,99m para colchão padrão de 1,90m x 0,90m. Com 4 gavetões grandes por baixo, a toda a largura da cama e profundos. Colchão não incluído.','UZyUtrDzhnOX4uYlKZ8cCytY7kFLNB.webp',1,'2022-11-27 17:44:09','2022-11-27 17:44:09',6,5),(56,'Conjunto mesa e 6 cadeiras','Mesa em ferro com tampo em vidro oval C 224 X L 120 X A 80 6 cadeiras em ferro com estofo em tecido. Tudo em perfeito estado.','XSo0gfRCanfpa5cbhDMRoY0lNsOEbF.webp',1,'2022-11-27 17:45:54','2022-11-27 17:45:54',8,5),(57,'Sofá modular 6 pessoas','Sofá modular em tecido chenille castanho. Almofadas de encosto de penas, almofadas de assento de penas e espuma.','tniaEbkeSWR26klgakmJJMIF2XmOo1.webp',1,'2022-11-27 17:48:15','2022-11-27 17:48:15',10,5),(58,'Cadeira de Escritório','Cadeira Executivo. Nunca usada. Comprada há 2 dias (não é a cor que pretendia). Com cabeceira regulável.','SD8u1sNZtDO0Ksmkjeyt6ytzaZBsGF.webp',0,'2022-11-27 17:49:55','2022-11-27 22:26:59',12,5),(59,'Panela Fondue Nova','Panela de Fondue em inox nova. Nunca foi usada. 6 garfos com cores diferenciadas.','ZR3rSZJHyKPmFaLJbImkjV0Xcm2p50.webp',1,'2022-11-27 17:51:10','2022-11-27 17:51:10',14,5),(60,'Puff com almofadas','Puff gigante cinzento com cerca de 2,90x1,90m e 5 almofadas…em excelente condições','HzzsRhU2QBiyq9HfKYVQrdKGgNCXEo.webp',0,'2022-11-27 17:52:49','2022-11-27 22:26:59',16,5),(61,'Candeeiro suspenso LED moderno NOVO na caixa','Candeeiro suspenso LED moderno, coleção de 3 anéis pintura branca, candeeiro suspenso ajustável candeeiro de teto moderno','izo18OzfgYRImkvrLJ1SNRO8zgPUMq.webp',0,'2022-11-27 17:54:27','2022-11-27 22:38:38',18,5),(62,'Aspirador robô IRobot 698','Com um ano e tem dois anos de garantia. Muito bom apenas gostaria de comprar outro.','nf4zOKUWSm0kcbgXWQrB4GhBfrScFa.webp',1,'2022-11-27 17:56:02','2022-11-27 17:56:02',20,5),(63,'Cadeira de escritório IKEA c/braços ajustáveis','Cadeira de escritório IKEA. Versão com braços ajustáveis. 6 meses de uso.','rMz2RNSxMlt41tEFbONjAAB14nEc7X.webp',1,'2022-11-27 17:57:57','2022-11-27 17:57:57',21,5),(64,'Aspirador-robô com mopa Eufy RoboVac X8 Hybrid preto','Aspirador-robô com mopa Eufy RoboVac X8 Hybrid, na cor preta, usado por menos de 6 meses e em estado de novo, com escova e filtros novos inclusos na caixa e todos os acessórios.','rS6eRpRmhO2pUH4UXecx3bP1iy9Sia.webp',0,'2022-11-27 18:00:27','2022-11-27 22:35:46',23,5),(65,'Candeeiro de teto suspenso SALOMON CROMADO','Candeeiro com pouco uso (oferta de lâmpada decorativa)','VMplJkdBRrBdPIHokHnCQFdzkpDziZ.webp',0,'2022-11-27 18:01:39','2022-11-27 22:38:38',25,5),(66,'Bicicleta electrica CUBE stereo 140P','Cube stereo pro 140p, tamanho L roda 29.  Comprada há 4 meses com apenas 450km, pretendo trocar por tamanho M, o L é muito alta para mim.','s4CykbgHQdm5yXZGn4b0CPY2e4NjxI.webp',1,'2022-11-27 18:04:23','2022-11-27 18:04:23',7,6),(67,'Scott Foil Premium Disc / Sram Red Etap / Rodas carbono','Bicicleta usada em excelente estado','Xe2VIBvlL6SL44AhJlH3qZwGkMGeOQ.webp',1,'2022-11-27 18:05:36','2022-11-27 18:05:36',9,6),(68,'NCM C7 (M/L) Bicicleta elétrica Urbana, 250W, Bateria 36V 14Ah 504Wh','Totalmente equipada para desempenho e alcance, a NCM C7 possui um sensor de torque que transforma a experiência da bicicleta elétrica em algo mais excitante. Isto é conseguido oferecer maior alcance do que a C5, mais potência e versatilidade.','TF0WAtoI1MkXPn6s4bhqY4QZ6ulIaL.webp',0,'2022-11-27 18:07:04','2022-11-27 22:19:38',11,6),(69,'Bicicleta BTT roda 24 muito bem equipada','Kona Honzo 24 em muito bom estado, com algumas marcas de uso (riscos nos manípulos dos travões e num ponto do quadro), equipada com suspensão Manitou 140 mm (extra)','lhDw1MA7SlX80leESM2SsfHPX9NdTH.webp',1,'2022-11-27 18:09:28','2022-11-27 18:09:28',13,6),(70,'Bike Downhill SANTA CRUZ V10','SANTA CRUZ V10 downhill, tamanho: M; suspensão: FOX40; cor: laranja, preto e branco; Roda: 27.5; Pneus MAXXIS Assegai. Mudanças e Travões da Shimano com 10 mudanças.','PJYaHFYWjXX1fL4cRZZrvYtyVSJug5.webp',0,'2022-11-27 18:10:56','2022-11-27 22:25:24',15,6),(71,'Bicicleta Estrada Scott ADDICT RC 15 Carbon Black Onyx','Quadro Addict RC Disc em Carbono HMX. Forqueta Addict RC HMX. Shimano Ultegra Di2 Disc de 24 velocidades.','nzACmzwzogiiDAnMXAAEHXrY1VYXF7.webp',1,'2022-11-27 18:12:21','2022-11-27 18:12:21',17,6),(72,'Bmc Team Elite 02 Full Carbon Tamanho S','Bicicleta completamente Nova, comprei há cerca de 9meses, Têm pneus originais logo dá para ver os km que foram andados.','UxTw32Plb9v4UYhVDzLig8qXEotOUy.webp',0,'2022-11-27 18:14:02','2022-11-27 22:25:24',6,6),(73,'Cervélo S5 Tamanho 54','Cervélo S5 Tamanho 54 Grupo Shimano Durace Rodas Mavic ksyrium Elite5 Totalmente Revisada','1ZDZ1bNSDXNuvz8So5j22ARBiINTgi.webp',0,'2022-11-27 18:15:15','2022-11-27 22:19:38',8,6),(74,'Bh G6 Pro Full Dura Ace','Bicicleta de estrada full carbono BH G6 PRO. Tamanho MD.','y3QQmOEFthJPIS0T3PD7ZH9R8zwKvy.webp',1,'2022-11-27 18:16:35','2022-11-27 18:16:35',10,6),(75,'Merida one sixty','Bike enduro Mérida one sixty. Tamanho M','vRCiq5Ou0E73rdLO6BupeeIg75ozza.webp',1,'2022-11-27 18:18:17','2022-11-27 18:18:17',12,6),(76,'Mondraker Ebike - Bicicleta Elétrica (tamanho M)','Mondraker e-Vantage R Plus de cor preta/amarela.','0pKX0SXcvXAvK9A53L5NL8dXYn11LJ.webp',1,'2022-11-27 18:19:51','2022-11-27 18:19:51',14,6),(77,'Samsung Galaxy Watch 4 Classic 46mm','Samsung Galaxy Watch 4 Classic 46mm cinza. Tem todos os acessórios e está imaculado, não tem uma única marca de uso.','XiFcs7eXW5LMmM6Azw1EcS2jn97mMZ.webp',0,'2022-11-27 18:23:11','2022-11-27 22:25:24',6,2),(78,'iPhone Xs 64GB Preto','O equipamento encontra-se em excelente estado pois sempre foi usado com capas e películas de gel frente e trás.','9L0fHKR3ZiafBfReNcEUt7rwt57Y1l.webp',0,'2022-11-27 18:24:52','2022-11-27 22:38:27',7,2),(79,'iPad 128gb c/ caixa original','iPad com 128gb. 6a geração (2018). WiFi e Celular. Cinzento sideral. Bateria em bom estado.','PeBI5HElrXwUfAaJ4UFsySU4sWM4W0.webp',1,'2022-11-27 18:26:45','2022-11-27 18:26:45',8,2),(80,'iPhone 11 128GB','iPhone 11 128GB - Usado como Novo','V8F2Wh2kUZVyWjj5kAMzPGQRKWA9st.webp',1,'2022-11-27 18:28:28','2022-11-27 18:28:28',9,2),(81,'Tablet Samsung A 8.0(2019)','Tablet Samsung 8.0 de 2019. 32gb memória interna. 2 Ram. Quase sem uso. Sem caixa.','mfqZW2UisYVy5IMzveSYRwjjYOiO3Q.webp',1,'2022-11-27 18:30:04','2022-11-27 18:30:04',10,2),(82,'iPhone 12 Mini 64GB','iPhone 12 Mini 64GB','Te0GNfKnagvMdNu8EPBKgVsBjvxrCz.webp',0,'2022-11-27 18:31:51','2022-11-27 22:23:37',11,2),(83,'MacBook Pro 16 (2019), 32 GB RAM, 512 SSD, i9, Radeon Pro 560x','32 GB RAM 512 SSD, Intel Core 2.3 GHz i9 Radeon Pro 560x 4 GB RAM Charger included.','Ysiv7hnvkudNUOpe5LqsXgEcjmHjmj.webp',0,'2022-11-27 18:34:11','2022-11-27 22:35:46',12,2),(84,'Canon EOS 250D pack 15-55 + bolsa + 16gb','Pack \"viagem\" Canon EOS 250Dcom objetiva 18-55, como nova, usada 2 vezes, cartão memória 16gb, carregador e bateria (carregada apenas 1 vez) e Bolsa de transporte. Tudo em caixas.','preYBQyMDRBhSuE9eOgPqI4E2rnWoq.webp',0,'2022-11-27 18:37:01','2022-11-27 22:29:44',13,2),(85,'VR PS4 impecável','VR PS4 em muito bom estado, funciona perfeitamente, vem com 1 jogo e 2 comandos para jogar em Realidade Virtual','eLRfTSPUpsXljspJHC7rFHrW0ofaET.webp',0,'2022-11-27 18:38:30','2022-11-27 22:23:37',14,2),(86,'Macbook Pro 13 2019 | i5 16GB 256 SSD Touchbar e ID','MacBook Pro  13 polegadas  2019  Quatro portas Thunderbolt 3  Processador i5  Memória 16GB  Armazenamento 256 GB','jk75VjagF2Wuw3qDd6tjwIjBCFZALM.webp',1,'2022-11-27 18:40:20','2022-11-27 18:40:20',15,2),(87,'Sony PSP + acessorios Hannah Montana','PSP lilás usada muito poucas vezes, completamente nova.','ehDxzSpkCH8sJfs3zwHzRSG2rM0bSZ.webp',1,'2022-11-27 18:42:06','2022-11-27 18:42:06',21,2),(88,'Ford Focus 1.6 TDCi Titanium','Veiculo em ótimo estado.  Tem a inspeção em dia e foi recentemente todo pintado porque parte da pintura estava desgastada por causa do sol.','IVA7zk0Y6mvvgrW4lSghoxRMP274EB.webp',1,'2022-11-27 18:45:25','2022-11-27 18:45:25',7,3),(89,'Renault Megane Sport Tourer','Renault Megane Sport Tourer Bose edition 1.5 110cv, viatura em perfeito estado de conservação interior e exterior. Bastante espaçosa e económica. Levou volante motor e kit embraiagem com 165000km.','lbcnwXtqpTP4FavyfIUiNkqo9IVPOg.webp',0,'2022-11-27 18:46:44','2022-11-27 22:25:38',9,3),(90,'BMW 120 D XDrive Pack M','2012. 210.000km. Diesel  ','wYMJo2031mEZgbwsnQj5sSOJO8l6gs.webp',1,'2022-11-27 18:48:26','2022-11-27 18:48:26',11,3),(91,'BMW k1200s impecável','Moto muito bom estado. Pneus semi novos. Escape remus original. Malas laterais.','koMi8nj4lRw3Q0fphhij2IPbTshYLg.webp',1,'2022-11-27 18:50:24','2022-11-27 18:50:24',13,3),(92,'Toyota BJ40 LandCruiser','Toyota LandCruiser BJ40 de 3 lugares para restauro, conforme fotos, a trabalhar e andar.','dbDjeaVqBqPf6jrfI5JCV4ZwKBxEvq.webp',0,'2022-11-27 18:52:21','2022-11-27 22:25:38',15,3),(93,'Golf 5 1,4 a gasolina','Golf 5 a gasolina , modelo SUV , equipado com um motor 1.4 de 90 cavalos e conta com 173.000 km. Carro a todo o nível bastante bom, o interior tem o teto com um pequeno desgaste a trás.','BjvK1hdhH64LKRDbY20eLRKAs00MwJ.webp',1,'2022-11-27 18:54:29','2022-11-27 18:54:29',17,3),(94,'KISS: 7 Álbuns (discos de vinil / LPs)','7 ÁLBUMS em vinil do grupo KISS, dos quais dois são duplos gravados ao vivo. São todos edições originais ou reedições dos anos 70/80, edições portuguesas e algumas importadas.','FBRnrsZ3njfrLJJaX7BWYwCFqUG5yV.webp',1,'2022-11-27 18:58:20','2022-11-27 18:58:20',6,7),(95,'6 CDs Bob Marley & The Wailers','6 CDs Bob Marley & The Wailers. CDs em óptimo estado.','8yusRgJH5xyCsjVmsmbTBp4l7hrQPZ.webp',1,'2022-11-27 18:59:53','2022-11-27 18:59:53',8,7),(96,'Discografia dos PINK FLOYD [Discos de Vinil: Álbuns]','18 álbuns dos PINK FLOYD, sendo todos edições originais ou reedições dos anos 60/70/80s e alguns deles importados.','GRpDHN1f4o596m6fKh3PqlwtImN3Oi.webp',1,'2022-11-27 19:02:01','2022-11-27 19:02:01',10,7),(97,'Viola de Fado Oscar Cardoso','Viola de fado construída por Oscar Cardoso no ano de 93. O guarda unhas foi retirado mas ainda o tenho, caso queira voltar a colocar.','1RQVJF8w514iiFAv1HM8ziLPSNrXrk.webp',1,'2022-11-27 19:05:58','2022-11-27 19:05:58',16,7),(98,'Fender Stratocaster MIM nova','Guitarra eléctrica Fender Stratocaster Player series strat MN black (México) de 2021. A guitarra é nova, muito pouco utilizada é sem qualquer marca de uso.','40D39Ad1WJhbMAM9gqXg96eaSvDqrw.webp',0,'2022-11-27 19:08:45','2022-11-27 22:29:44',18,7),(99,'Guitarra clássica Stagg preta modelo C542BK','Guitarra clássica Stagg preta modelo C542BK. Em ótimo estado. Usada muito poucas vezes.','2E9Rpa3IVJ3FN28ntjo4UVbiW6T4iC.webp',1,'2022-11-27 19:10:23','2022-11-27 19:10:23',20,7),(100,'iPhone8 64GB Space Gray','iPhone 8 64GB. Cor Space Gray. Usado em bom estado. Estado da bateria: 75%','RqGeh47YWIvK1ZvRIxr381sgnNVNiS.webp',1,'2022-11-27 20:18:13','2022-11-27 20:18:13',22,2),(101,'Samsung A02s ***SELADO***','Samsung A02s selado 32GB Black. Pronto a estrear, novo na caixa.','GK2s2HVhBcdowCHQemZLqNDqOLEtrK.webp',1,'2022-11-27 20:20:16','2022-11-27 20:20:16',24,2),(102,'iPod Classic 160GB','Usado mas em prefeito funcionamento. Uma qualidade de som acima da qualquer leitor do género.','l7fw0pieIwaZ5JqMIPHrWh4R207G2p.webp',0,'2022-11-27 20:22:54','2022-11-27 22:38:27',25,2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `latitude` float(10,6) DEFAULT NULL,
  `longitude` float(10,6) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'marcus_mesquita@gmail.com','$2a$10$J83EoPv0iwVsKhMy9bkpg.9bEbv6FSFPLm4QulhOL3RKfnL7DwQ8i','Marcus Mesquita','Porto',41.145840,-8.610810,'4vJJAYGibUAzltYmQxtC6v29TFQsSI.jpeg',3,'2022-11-27 16:33:42','2022-11-27 22:25:29'),(7,'graig_wommack@gmail.com','$2a$10$f9OVljpN0ePerIf5X4iY8u1G7nVQWDcH3CxKbtVmCZuQB7c2IGJuS','Graig Wommack','Lisboa',38.726330,-9.149510,'KlvAU1r0KoUCK7SPAQcqi3iB8MrFJG.jpeg',4,'2022-11-27 16:34:32','2022-11-27 22:38:31'),(8,'roosevelt_gharibian@gmail.com','$2a$10$ATKZyFsnndIIbgvqFfEKIOQA1vzDj1Q211GlLmbcmB6K5tvbA4ckG','Roosevelt Gharibian','Vila Nova de Gaia',41.129131,-8.613780,'BJfiAjv5KzMcbDYur4bSGyUL80N0m7.jpeg',3,'2022-11-27 16:35:16','2022-11-27 22:20:17'),(9,'reginald_teetzen@gmail.com','$2a$10$x/JV3q2SlhnY9ttAKgJeKuTdGygkD6X6qciBh/wml0W0UcHBNB0wu','Reginald Teetzen','Setubal',38.524700,-8.894230,'rDWpDXR6CEPgBGR0sXZAmb45Tjjmlg.jpeg',5,'2022-11-27 16:36:26','2022-11-27 22:25:45'),(10,'abraham_hutchin@gmail.com','$2a$10$K8KEUSnZaK/9VF0Vg.L2dObc2V1P4EPBptwXpFX8hF2o6dPwDxqDa','Abraham Hutchin','Braga',41.551609,-8.429150,'PRpqopVoizJAwS2FCWk5AjtI4zhoIS.jpeg',NULL,'2022-11-27 16:37:04','2022-11-27 16:37:04'),(11,'giovanni_gorzalski@gmail.com','$2a$10$x8FD2BfqkivIfiT0Cce.ru5av102KLQR5X6LnpP.Xt8AfhI8X9e2u','Giovanni Gorzalski','Santarem',39.237980,-8.685250,'xnEiLnVJGLjpLRwVav4ga5eEfJV4JE.jpeg',4,'2022-11-27 16:37:57','2022-11-27 22:23:43'),(12,'terrance_paup@gmail.com','$2a$10$0wbBRombKVP01AmapFJpB.mRFDajbtLaj.Qbj9MiuOvT6edmDFVVS','Terrance Paup','Porto',41.145840,-8.610810,'hf5AW6nlWxm48wuXZA46HD9hfVd4wc.jpeg',4,'2022-11-27 16:38:41','2022-11-27 22:35:57'),(13,'shaun_pompili@gmail.com','$2a$10$uzwbuoxo9xGBlbHTBMHoQ.TzbmbkDlwcZYRCfu956E5KnUBejsTF2','Shaun Pompili','Porto',41.145840,-8.610810,'mwWzNqW4uemZgh5O2yr7wxTEpMOMAq.jpeg',4,'2022-11-27 16:39:24','2022-11-27 22:29:50'),(14,'anderson_krott@gmail.com','$2a$10$BEuzkJFvUmJbCBBG7oLdEu.bAU878w7fyJjJFsliJ1SrQZz56onn6','Anderson Krott','Guimaraes',41.445492,-8.294100,'vbnQncfBOJLd73znahyevMuRaI0DEn.jpeg',NULL,'2022-11-27 16:40:08','2022-11-27 16:40:08'),(15,'alix_blindt@gmail.com','$2a$10$Rj8Fy7jr8w6.JI3DpBnu0OpBlbXaRAZLY/nS42OcspaGTy9gxY/Ye','Alix Blindt','Braga',41.551609,-8.429150,'67UdgNKhg2cTgxswuXa6WaynKM5ETI.jpeg',NULL,'2022-11-27 16:43:25','2022-11-27 16:43:25'),(16,'jacqulyn_tortora@gmail.com','$2a$10$PCiX8lw7avcz5GCNc8.jUOaLv2c.NjrqhPVs1llYlokn/ZWtwNSuC','Jacqulyn Tortora','Sintra',38.798119,-9.388800,'3BOYCQ9cEYOnJiF1QtoLVwxwW6ByFY.jpeg',NULL,'2022-11-27 16:45:41','2022-11-27 16:45:41'),(17,'micah_brockenbrough@gmail.com','$2a$10$ehRRqQ/nEWcaW7kGrVf5hOmN.FNpIJUsyN9BbDG2MqXLDx2mSWV2u','Micah Brockenbrough','Vila Nova de Gaia',41.129131,-8.613780,'L41VskEEpp9m1bySc54kax4gEyfcgX.jpeg',NULL,'2022-11-27 16:46:36','2022-11-27 16:46:36'),(18,'janyce_flieg@gmail.com','$2a$10$fd9uMC6asRpbLa7VUXsITehIRaaeLfvHSfgdhc8Nb6jaf7Ctgjv/e','Janyce Flieg','Matosinhos',41.186691,-8.676930,'2PdoYDhsOfXnpv00CfyAzD0dYutoId.jpeg',2,'2022-11-27 16:47:23','2022-11-27 22:38:45'),(19,'janna_iwanow@gmail.com','$2a$10$TR/PWHzxSrwIVG/JT49kM.QfFWav9zrkDIGsrrXCSDBxU42hZp4eu','Janna Iwanow','Braga',41.551609,-8.429150,'WmTHk0JGln5Tb6YhpCv0kF7Ln7GQST.jpeg',NULL,'2022-11-27 16:48:04','2022-11-27 16:48:04'),(20,'mayme_panuco@gmail.com','$2a$10$ZawouSj.C069X4885yShVefyCZPJ9T/xB7/m/EtCUWIoKil.HAUHi','Mayme Panuco','Viseu',40.656952,-7.914630,'qkW4HrqgfjwqgjRCgZ3irsD362sJvj.jpeg',5,'2022-11-27 16:48:50','2022-11-27 22:35:34'),(21,'milda_marks@gmail.com','$2a$10$njut6LjlQlkxOnv1JKdXUOeDqbq/D7I6yc9GX7JT5GQim2Rx41ykC','Milda Marks','Aveiro',40.641232,-8.653910,'CfhkOAaF6bgGBLaQESR5v2agEerNTP.jpeg',NULL,'2022-11-27 16:49:33','2022-11-27 16:49:33'),(22,'socorro_almusawi@gmail.com','$2a$10$e/mVqJCkIMkaCov6pPItb.Tjw6poWWpGDczZIYzvYjoF6L6DQV.2a','Socorro Almusawi','Porto',41.145840,-8.610810,'vwtr1CgBebc3BkcZB4IPSvkcSX9AdT.jpeg',4,'2022-11-27 16:50:17','2022-11-27 22:36:31'),(23,'katharine_tonche@gmail.com','$2a$10$LWeDNcIhzW0L05l3uH/eDu4uhH.YN0OQkmJZc/GSHtn9sylvJhOe2','Katharine Tonche','Beja',38.018730,-7.866540,'ptpBcUPKYAQJTddi9CsqjmVB3cWyau.jpeg',NULL,'2022-11-27 16:50:51','2022-11-27 16:50:51'),(24,'kristen_sieh@gmail.com','$2a$10$6nNehaimxllDXw/VPKvdtOZWdLIEOYXzndrcIMQyNyVGDzy/nYBo2','Kristen Sieh','Vila Real',41.295780,-7.747510,'zasvNnGJlKoTGcWg24Rf5k2Sh6qFvD.jpeg',NULL,'2022-11-27 16:52:04','2022-11-27 16:52:04'),(25,'domonique_guinard@gmail.com','$2a$10$gzLQ7UB4tBsSYOS4F18D2.0GxD2QYlsk1U5LL/g1pOm.TZfCU1u0W','Domonique Guinard','VIana do Castelo',41.695648,-8.829130,'qqvxE80KCOrA0sanxSRuYW6zHTqdpW.jpeg',NULL,'2022-11-27 16:52:49','2022-11-27 16:52:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-27 22:47:55
