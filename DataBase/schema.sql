-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ejemplolau
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ejemplolau
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ejemplolau` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ejemplolau` ;

-- -----------------------------------------------------
-- Table `ejemplolau`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ejemplolau`.`Usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `fechaInscripcion` TIMESTAMP NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `edad` INT NULL,
  `peso` FLOAT NULL,
  `sexo` ENUM("MUJER", "HOMBRE", "OTROS") NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ejemplolau`.`Caminata`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ejemplolau`.`Caminata` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lugar` VARCHAR(100) NOT NULL,
  `duracion` INT UNSIGNED NOT NULL,
  `dificultad` TINYINT(10) UNSIGNED NOT NULL,
  `compania` TINYINT(1) NULL DEFAULT 0,
  `Usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Usuario_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Caminata_Usuario_idx` (`Usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Caminata_Usuario`
    FOREIGN KEY (`Usuario_id`)
    REFERENCES `ejemplolau`.`Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
