-- SHEMA --
-----------
CREATE TABLE `imenik` (
  `id` int(11) NOT NULL,
  `imePrezime` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `adresa` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `brojTelefona` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- INDEXES/KEYS --
----------
ALTER TABLE `imenik`
  ADD PRIMARY KEY (`id`);

-- PRIMARY KEY -- 
-----------------
ALTER TABLE `imenik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- DATA --
----------
INSERT INTO `imenik` (`id`, `imePrezime`, `adresa`, `brojTelefona`) VALUES
(1, 'Amer Mehmedic', 'Salke Nazečića 1', '062138467'),
(2, 'Dzeniza Pendic', 'Potoci bb', '066666666'),
(3, 'Mujo Mujic', 'AAAA', '234823423'),
(4, 'Ivo Ivic', 'BBBB', '12323144234514'),
(5, 'Edin Dzeko', 'CCCCC', '34239423'),
(6, 'Yes Yes', 'Yes', '2131231231')