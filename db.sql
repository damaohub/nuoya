--
-- 表的结构 `adminuser`
--

CREATE TABLE IF NOT EXISTS `adminuser` (
  `id` int(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `uuid` varchar(255) UNIQUE KEY NOT NULL,
  `username` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` bigint NOT NULL,
  `updatedAt` bigint NOT NULL,
  `profile` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 转存数据
INSERT INTO `adminuser` (`id`, `username`,`uuid`,`nickname`, `password_hash`, `email`, `createdAt`, `updatedAt`,`profile`) VALUES
(1, 'test','bgeVB90pxvWlNo8pR4ODdk3zQw6MZyAP','测试', '90e8a77b73124765faef9490884dba2b', '630723978@qq.com', 1521351431001, 1521351431001, NULL);

--
-- 表的结构 `role`
--
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` bigint NOT NULL,
  `updatedAt` bigint NOT NULL
  ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
-- 转存数据
INSERT INTO `role` (`id`, `name`,`description`,`createdAt`, `updatedAt`) VALUES ('1','admin','管理员',1521351431001, 1521351431001), ('2','editor','编辑', 1521351431001, 1521351431001), ('3','vistor','访客',1521351431001, 1521351431001);

--
-- 创建关联表 `admin_role`
--
CREATE TABLE `admin_role` (
  `id` int(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `adminuserId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdAt` bigint NOT NULL,
  `updatedAt` bigint NOT NULL,
  KEY `fk_admin_role_t_role_1` (`roleId`),
  KEY `fk_admin_role_t_user_1` (`adminuserId`),
  CONSTRAINT `fk_admin_role_t_role_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_admin_role_t_user_1` FOREIGN KEY (`adminuserId`) REFERENCES `adminuser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `admin_role` VALUES ('1','1','1','1521351431001','1521351431001'), ('2','2','2','1521351431001','1521351431001');


CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `uuid` varchar(255) UNIQUE KEY NOT NULL,
  `title` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` bigint NOT NULL,
  `updatedAt` bigint NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `frequency` int(11) DEFAULT '1',
  `createdAt` bigint NOT NULL,
  `updatedAt` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
INSERT INTO `tag` (`id`, `name`,`createdAt`, `updatedAt`) VALUES ('1','node.js',1521351431001, 1521351431001), ('2','php', 1521351431001, 1521351431001), ('3','vue' ,1521351431001, 1521351431001);

CREATE TABLE `post_tag` (
  `id` int(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  `createdAt` bigint NOT NULL,
  `updatedAt` bigint NOT NULL,
  KEY `fk_post_tag_t_tag_1` (`postId`),
  KEY `fk_post_tag_t_post_1` (`tagId`),
  CONSTRAINT `fk_post_tag_t_tag_1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_post_tag_t_post_1` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO `post_tag` VALUES ('1','1','1','1521351431001','1521351431001'), ('2','2','2','1521351431001','1521351431001');
INSERT INTO `post_tag` VALUES ('3','1','3','1521351431001','1521351431001'), ('4','2','1','1521351431001','1521351431001'),('5','1','2','1521351431001','1521351431001'),('6','3','1','1521351431001','1521351431001');








CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` bigint NOT NULL,
  `updatedAt` bigint NOT NULL,
  `userid` int(11) NOT NULL,
  `email` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `commentstatus` (
  `id` int(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `createdAt` bigint NOT NULL,
  `updatedAt` bigint NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `commentstatus` (`id`, `name`, `position`) VALUES
(1, '待审核', 1),
(2, '已审核', 2);

CREATE TABLE IF NOT EXISTS `migration` (
  `version` varchar(180) COLLATE utf8_unicode_ci NOT NULL,
  `apply_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
--
-- 表的结构 `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `uuid` varchar(255) UNIQUE KEY NOT NULL,
  `title` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `tags` text COLLATE utf8_unicode_ci,
  `status` int(11) NOT NULL,
  `createdAt` bigint NOT NULL,
  `updatedAt` bigint NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `frequency` int(11) DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE IF NOT EXISTS `poststatus` (
 `id` int(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `poststatus` (`id`, `name`, `position`) VALUES
(1, '草稿', 1),
(2, '已发布', 2);

CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `frequency` int(11) DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `user` (
 `id` int(11)  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `uuid` varchar(255) UNIQUE KEY NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `auth_key` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
 `createdAt` bigint NOT NULL,
  `updatedAt` bigint NOT NULL
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO `user` (`id`, `username`,`uuid`,`auth_key`, `password_hash`, `password_reset_token`, `email`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'test','bgeVB90pxvWlNo8pR4ODdk3zQw6MZyAP','pG7TRyTIXlEbcenpi34TzmMYS2zDsMTF', '90e8a77b73124765faef9490884dba2b', NULL, '630723978@qq.com', 10, 1521351431001, 1521351431001);

INSERT INTO `user` (`id`, `username`,`uuid`,`auth_key`, `password_hash`, `password_reset_token`, `email`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'test','bgeVB90pxvWlNo8pR4ODdk3zQw6MZyAP','pG7TRyTIXlEbcenpi34TzmMYS2zDsMTF', '90e8a77b73124765faef9490884dba2b', NULL, '630723978@qq.com', 10, 1521351431001, 1521351431001);



-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`), ADD KEY `FK_comment_post` (`post_id`), ADD KEY `FK_comment_user` (`userid`), ADD KEY `FK_comment_status` (`status`);

--
-- Indexes for table `commentstatus`
--
ALTER TABLE `commentstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migration`
--
ALTER TABLE `migration`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
   ADD KEY `FK_post_author` (`author_id`), ADD KEY `FK_post_status` (`status`);
--
-- Indexes for table `poststatus`


--
-- 限制表 `post`
--
ALTER TABLE `post`
ADD CONSTRAINT `FK_post_author` FOREIGN KEY (`author_id`) REFERENCES `adminuser` (`id`) ON DELETE CASCADE,
ADD CONSTRAINT `FK_post_status` FOREIGN KEY (`status`) REFERENCES `poststatus` (`id`) ON DELETE CASCADE;










select u.id,u.name,r.roleName,r.description from users u,role r,UserRole ur where u.id='1'and u.id=ur.userID and ur.roleID=r.id; 

