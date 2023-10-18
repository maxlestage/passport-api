import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const response = await prisma.user.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const response = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                telephone: false,
                email: false,
                password: false,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const createUser = async (req, res) => {
    const { nom, prenom, telephone, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                nom,
                prenom,
                telephone,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                telephone: true,
                email: true,
                password: false,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Failed to create user" });
    }
};

export const updateUser = async (req, res) => {
    const { name, price } = req.body;
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                nom,
                prenom,
                telephone,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};