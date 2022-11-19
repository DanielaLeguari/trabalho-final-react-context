import { TChildren, TContactsContext, TContactsData, TContacts } from '../utils/types'
import { createContext, useState } from "react";

import { API } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


import nProgress from 'nprogress';
import { toastConfig } from "../utils/toast";


export const ContactsContext = createContext({} as TContactsContext);

export const ContactsProvider = ({ children }: TChildren) => {
  const token = localStorage.getItem('token');
  const [totalPages, setTotalPages] = useState(0);
  const [contactsList, setContacts] = useState<TContactsData[]>([]);
  const navigate = useNavigate();

  const getContacts = async () => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      const { data } = await API.get(`/contato`);
      setTotalPages(data.totalPages);
      setContacts(data);
    } catch (error) {
      console.error(error)
    } finally {
      nProgress.done();
    }
  };

  const createContact = async (contact: TContacts) => { //NÃO ESTÁ FUNCIONANDO
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      contact.tipoContato = contact.tipoContato.toUpperCase();
      contact.idPessoa = 7035;
      await API.post("/contato", contact.idPessoa);
      toast.success("Pessoa cadastrada com sucesso!", toastConfig);
      navigate("/contacts");
    } catch (error) {
        console.log(error)
      toast.error("Houve algum erro", toastConfig);
    } finally {
      nProgress.done();
    }
  };

  const deleteContact = async (idContato: number) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      await API.delete(`/contato/${idContato}`);
      toast.success("Usuário excluído com sucesso!",toastConfig);
        getContacts()
    } catch (error) {
      toast.error("Houve algum erro, tente novamente!",toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const updateContact = async (idContato: number, people: TContacts) => {
    try {
      nProgress.start();
      API.defaults.headers.common["Authorization"] = token;
      await API.put(`/contato/${idContato}`, people);
      toast.success('Dados atualizados com sucesso!', toastConfig);
      navigate('/contacts');
    } catch (error) {
      toast.error('Houve um erro inesperado', toastConfig);
    } finally {
      nProgress.done();
    }
  }


  return (
    <ContactsContext.Provider value={{ getContacts, contactsList, totalPages, createContact, deleteContact, updateContact }}>
      {children}
    </ContactsContext.Provider>
  )
}