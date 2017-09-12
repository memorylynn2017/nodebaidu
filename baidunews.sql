--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `newstype` char(200) NOT NULL,
  `newstittle` varchar(200) NOT NULL,
  `newsimg` varchar(200) NOT NULL,
  `newstime` datetime NOT NULL,
  `newssrc` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `newstype`, `newstittle`, `newsimg`, `newstime`, `newssrc`) VALUES
(46, '百家', '学编程，只有不断写代码，熟知业务逻辑。。', 'img/2.jpg', '2017-06-23 00:00:00', '1111'),
(47, '本地', '学编程，只有不断写代码，熟知业务逻辑。。', 'img/3.jpg', '2017-06-23 00:00:00', '222'),
(48, '图片', '学编程，只有不断写代码，熟知业务逻辑。。', 'img/4.jpg', '2017-06-23 00:00:00', '333'),
(49, '娱乐', '学编程，只有不断写代码，熟知业务逻辑。。', 'img/5.jpg', '2017-06-23 00:00:00', '555');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
