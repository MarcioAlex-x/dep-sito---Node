import { DataTypes } from "sequelize";
import db from "../db/conn.js";

export const Produto = db.define("Produtos", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
