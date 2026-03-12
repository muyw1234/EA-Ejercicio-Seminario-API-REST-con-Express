import mongoose from 'mongoose';
import Organizacion, { IOrganizacionModel, IOrganizacion } from '../models/Organizacion';
import Usuario, { IUsuarioModel } from '../models/Usuario';

const createOrganizacion = async (data: Partial<IOrganizacion>): Promise<IOrganizacionModel> => {
    const organizacion = new Organizacion({
        _id: new mongoose.Types.ObjectId(),
        ...data
    });
    return await organizacion.save();
};

const getOrganizacion = async (organizacionId: string): Promise<IOrganizacionModel | null> => {
    return await Organizacion.findById(organizacionId);
};

const getAllOrganizaciones = async (): Promise<IOrganizacionModel[]> => {
    return await Organizacion.find();
};

const updateOrganizacion = async (organizacionId: string, data: Partial<IOrganizacion>): Promise<IOrganizacionModel | null> => {
    const organizacion = await Organizacion.findById(organizacionId);
    if (organizacion) {
        organizacion.set(data);
        return await organizacion.save();
    }
    return null;
};

const deleteOrganizacion = async (organizacionId: string): Promise<IOrganizacionModel | null> => {
    return await Organizacion.findByIdAndDelete(organizacionId);
};

const getUsuariosByOrganizacion = async (organizacionId: string): Promise<IOrganizacionModel | null> => {
    return await Usuario.find({ organizacion: organizacionId })
        .populate('organizacion') // Esto funciona gracias a que el campo ref está bien definido
        .lean();
    
    
    //return await Usuario.find({ organizacion: organizacionId }).lean();
};


export default { createOrganizacion, getOrganizacion, getAllOrganizaciones, updateOrganizacion, deleteOrganizacion, getUsuariosByOrganizacion };
