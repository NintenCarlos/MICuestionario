import { Request, Response } from "express";
import { UserModel } from "../Models/UsersModel";

export const RegisterUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //Validar si los datos existen
    const name = req.body.name;
    const email = req.body.email;
    const lastNames = req.body.lastNames;
    const password = req.body.password;
    const rol = req.body.rol;

    //Los administradores no pueden crear clientes
    if (req.user?.rol === "administrator" && rol === "client") {
      res.status(400).json({
        msg: "Los administradores no pueden crear clientes.",
      });
      return;
    }

    if (!name || !email || !lastNames || !password || !rol) {
      res.status(400).json({
        msg: "Faltan datos para completar el usuario",
      });
      return;
    }

    //Validar que el usuario sea admin si el usuario a crear es administrador.
    if (rol === "administrator" && req.user?.rol != "administrator") {
      res.status(400).json({
        msg: "No puedes crear un administrador, ya que no eres uno.",
      });
      return;
    }

    await UserModel.create({
      name,
      lastNames,
      email,
      password,
      rol,
    });

    res.status(200).json({
      msg: "Usuario registrado con éxtio.",
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error al crear el usuario",
    });
    return;
  }
};
