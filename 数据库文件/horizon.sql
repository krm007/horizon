-- --------------------------------------------------------
-- 主机:                           localhost
-- 服务器版本:                        5.5.53 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.5.0.5220
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出  表 horizon.admin 结构
CREATE TABLE IF NOT EXISTS `admin` (
  `aid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户主键',
  `username` char(4) NOT NULL COMMENT '管理员用户名实名制',
  `passwd` char(32) NOT NULL COMMENT '密码',
  `loginnum` int(11) NOT NULL COMMENT '登录次数',
  `lastlogin` datetime NOT NULL COMMENT '最后一次登录时间',
  `ip` char(15) NOT NULL COMMENT '记录登录的ip',
  PRIMARY KEY (`aid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='管理员信息表';

-- 数据导出被取消选择。
-- 导出  表 horizon.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户主键',
  `username` char(12) NOT NULL COMMENT '账号',
  `passwd` char(32) NOT NULL COMMENT 'MD5加密密码',
  `tel` char(11) NOT NULL COMMENT '手机号',
  `email` char(32) NOT NULL COMMENT '邮箱',
  `header` char(250) NOT NULL COMMENT '头像地址',
  `loginnum` int(11) NOT NULL COMMENT '登录次数',
  `ip` char(15) NOT NULL COMMENT '用户ip',
  `lasttime` datetime NOT NULL COMMENT '最后访问的时间',
  `regtime` datetime NOT NULL COMMENT '注册时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户状态，0表示正常',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户注册信息表';

-- 数据导出被取消选择。
-- 导出  表 horizon.work 结构
CREATE TABLE IF NOT EXISTS `work` (
  `wid` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类主键',
  `wname` char(20) NOT NULL COMMENT '分类名称',
  `aid` int(11) NOT NULL COMMENT '谁加的分类',
  `username` char(4) NOT NULL COMMENT '添加人的账号',
  `addtime` datetime NOT NULL COMMENT '添加时间',
  `updatetime` datetime NOT NULL COMMENT '修改时间',
  `status` tinyint(4) NOT NULL COMMENT '0表示正常',
  PRIMARY KEY (`wid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='作品分类信息表';

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
