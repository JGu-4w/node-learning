CREATE TABLE IF NOT EXISTS `t_products` (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(20) UNIQUE NOT NULL,
	description VARCHAR(200) DEFAULT(''),
	price DOUBLE DEFAULT(0),
	publishTime DATETIME
)

INSERT INTO `t_products` (title, description, price, publishTime) VALUES ('标题', '这是一条标题', '30.00', '2022-01-19')

DELETE FROM `t_products` WHERE id = 1;

UPDATE `t_products` SET title = '修改标题', description = '修改描述' WHERE id = 2;

-- 修改数据后显示最新更新时间
ALTER TABLE `t_products` ADD updateTime TIMESTAMP DEFAULT(CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP;