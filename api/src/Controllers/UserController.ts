import { Request, Response } from "express";
import { UserModel } from "../Models/UsersModel";
import jwt from "jsonwebtoken";

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

    const user = await UserModel.create({
      name,
      lastNames,
      email,
      password,
      rol,
    });

    const token = jwt.sign(JSON.stringify(user), "Pollos Violados");

    res.status(200).json({
      msg: "Usuario registrado con éxtio.",
      token,
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

export const signIn = async (req: Request, res: Response): Promise<void> => {
  //Verificar si los datos están correctos
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400).json ({
      msg: 'Los datos están incompletos'
    })
    return
  }

  //Verifica que no esté el usuario.
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });

 
    //Token
    const token = jwt.sign(JSON.stringify(user), "Pollos Violados");

    //Verifica que si está el usuario
    if (user) {
      res.status(200).json({
        msg: "El usuario está en la base de datos.",
        token, user
      });
      return;
    }

    if (!user) {
      res.status(400).json({
        msg: "El usuario no está registrado en la base de datos.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error al encontrar el usuario",
    });
    return;
  }
};
