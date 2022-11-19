import Aside from '../../components/Aside/Aside';
import styles from './CreateAddress.module.css';

import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { addressFormSchema } from "../../utils/schemas";

import { TAddress } from "../../utils/types";
import { AddressContext } from '../../context/AddressContext';

import InputMask from "react-input-mask";
import { useLocation } from 'react-router-dom';

const CreateAddress = () => {

  const { state } = useLocation();
  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm<TAddress>({
    resolver: yupResolver(addressFormSchema)
  });
  const { createAddress, getAddressByCep, addressFromApi } = useContext(AddressContext);
  const cep = watch("cep");

  useEffect(() => {
    setValue("logradouro", addressFromApi?.logradouro);
    setValue("cidade", addressFromApi?.localidade);
    setValue("estado", addressFromApi?.uf)
  }, [addressFromApi]);

  return (
    <>
      <Aside />
      <form className={styles.form} onSubmit={handleSubmit((data: TAddress) => createAddress(data))}>
        <div className={styles.container}>
          <h2>Cadastrar novo endereço</h2>
          <input type="hidden" id="idPessoa" defaultValue={state} {...register("idPessoa")} />

          <div>
            <label htmlFor="cep"><span>*</span> CEP</label>
            <InputMask mask="99999-999" type="text" id="cep" {...register("cep")} onBlur={() => getAddressByCep(cep)} />
            {errors.cep && <p>{errors.cep.message}</p>}
          </div>

          <div>
            <label htmlFor="tipo"><span>*</span> Tipo do endereço</label>
            <select id="tipo" {...register("tipo")}>
              <option value="RESIDENCIAL">Residencial</option>
              <option value="COMERCIAL">Comercial</option>
            </select>
            {errors.tipo && <p>{errors.tipo.message}</p>}
          </div>

          <div>
            <label htmlFor="logradouro"><span>*</span> Logradouro</label>
            <input type="text" id="logradouro" {...register("logradouro")} />
            {errors.logradouro && <p>{errors.logradouro.message}</p>}
          </div>

          <div>
            <label htmlFor="numero"><span>*</span> Número</label>
            <input type="number" id="numero" {...register("numero")} />
            {errors.numero && <p>{errors.numero.message}</p>}
          </div>

          <div>
            <label htmlFor="complemento"><span>*</span> Complemento</label>
            <input type="text" id="complemento" {...register("complemento")} />
            {errors.complemento && <p>{errors.complemento.message}</p>}
          </div>

          <div>
            <label htmlFor="cidade"><span>*</span> Cidade</label>
            <input type="text" id="cidade" {...register("cidade")} />
            {errors.cidade && <p>{errors.cidade.message}</p>}
          </div>

          <div>
            <label htmlFor="estado"><span>*</span> Estado</label>
            <input type="text" id="estado" {...register("estado")} />
            {errors.estado && <p>{errors.estado.message}</p>}
          </div>

          <div>
            <label htmlFor="pais"><span>*</span> País</label>
            <input type="text" id="pais" defaultValue="Brasil" {...register("pais")} />
            {errors.pais && <p>{errors.pais.message}</p>}
          </div>

          <input type="submit" value="Cadastrar" />
        </div>
      </form>
    </>


  )
}

export default CreateAddress