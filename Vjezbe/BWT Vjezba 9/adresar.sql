-- SHEMA --
-----------
CREATE TABLE `adresar` (
  `id` int(11) NOT NULL,
  `idKontakt` int(11) NOT NULL,
  `idPoznanik` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- INDEXES/KEYS --
----------
ALTER TABLE `adresar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adresar_imenik_fk1` (`idKontakt`),
  ADD KEY `adresar_imenik_fk2` (`idPoznanik`);

-- PRIMARY KEY -- 
-----------------
ALTER TABLE `adresar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- FOREIGN  KEYS --
-------------------
ALTER TABLE `adresar`
  ADD CONSTRAINT `adresar_imenik_fk1` FOREIGN KEY (`idKontakt`) REFERENCES `imenik` (`id`),
  ADD CONSTRAINT `adresar_imenik_fk2` FOREIGN KEY (`idPoznanik`) REFERENCES `imenik` (`id`);

-- DATA --
----------
INSERT INTO `adresar` (`id`, `idKontakt`, `idPoznanik`) VALUES
(1, 1, 2),
(2, 1, 4),
(3, 2, 1),
(4, 2, 3),
(5, 2, 5),
(6, 4, 5),
(7, 4, 2),
(8, 4, 1),
(9, 3, 1),
(10, 3, 2),
(11, 3, 4),
(12, 3, 5),
(13, 5, 1),
(14, 5, 2);