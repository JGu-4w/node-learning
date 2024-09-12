CREATE TABLE IF NOT EXISTS `products`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	brand VARCHAR(20),
	title VARCHAR(100) NOT NULL,
	price DOUBLE NOT NULL,
	score DECIMAL(2,1),
	voteCnt INT,
	url VARCHAR(100),
	pid INT
)

SELECT 
	brand,
	MAX(price) maxPrice,
	MIN(price) minPrice,
	MAX(score) maxScore,
	MIN(score) minScore,
	ROUND(AVG(score), 2) avgScore 
FROM `products`
GROUP BY brand
HAVING brand = '华为';


CREATE TABLE `brands`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL
)
INSERT INTO `brands` (name) VALUES ('苹果');
INSERT INTO `brands` (name) VALUES ('小米');
INSERT INTO `brands` (name) VALUES ('OPPO');
INSERT INTO `brands` (name) VALUES ('vivo');
INSERT INTO `brands` (name) VALUES ('魅族');
INSERT INTO `brands` (name) VALUES ('华为');

ALTER TABLE `products` ADD `brand_id` INT;
ALTER TABLE `products` ADD FOREIGN KEY (brand_id) REFERENCES `brands`(id);

UPDATE `products` SET `brand_id` = 1 WHERE `brand` = '苹果';
UPDATE `products` SET `brand_id` = 2 WHERE `brand` = '小米';
UPDATE `products` SET `brand_id` = 3 WHERE `brand` = 'OPPO';
UPDATE `products` SET `brand_id` = 4 WHERE `brand` = 'vivo';
UPDATE `products` SET `brand_id` = 6 WHERE `brand` = '华为';

SHOW CREATE TABLE `products`;
-- CREATE TABLE `products` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `brand` varchar(20) DEFAULT NULL,
--   `title` varchar(100) NOT NULL,
--   `price` double NOT NULL,
--   `score` decimal(2,1) DEFAULT NULL,
--   `voteCnt` int DEFAULT NULL,
--   `url` varchar(100) DEFAULT NULL,
--   `pid` int DEFAULT NULL,
--   `brand_id` int DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `brand_id` (`brand_id`),
--   CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

ALTER TABLE `products` DROP FOREIGN KEY `products_ibfk_1`;
ALTER TABLE `products` ADD FOREIGN KEY (brand_id) REFERENCES `brands`(id)
			ON DELETE RESTRICT
			ON UPDATE CASCADE;
			
UPDATE `brands` SET id = 99 WHERE name = '华为';

-- 左连接
SELECT * FROM `products` LEFT JOIN `brands` ON products.brand_id = brands.id;
-- 内连接
SELECT * FROM `products` JOIN `brands` ON products.brand_id = brands.id;

-- 查询结果转对象
SELECT
	products.id as id, products.title as title, products.price as price,
	JSON_OBJECT('brand_id', brands.id, 'brand_name', brands.`name`) as brand
FROM `products` LEFT JOIN `brands` ON products.brand_id = brands.id;

-- 查询结果转数组
SELECT
	brand,
	JSON_ARRAYAGG(JSON_OBJECT('pid', pid, 'title', title, 'price', price)) as list
FROM products
GROUP BY products.brand;