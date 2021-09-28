import React from "react";
import { useForm } from "react-hook-form";
import { Button, Spinner, Label, Input, TextArea } from "../../components";
import { Client } from "../../store/ducks/clientsSlice";
import { colors, Column, Form, Row } from "../../styles";
import * as S from "./styled";

type ModalShareProps = {
  open: boolean;
  loading: boolean;
  onSubmit: () => void;
  data: Client | any;
  setOpenShareModal: (value: React.SetStateAction<boolean>) => void;
};

const ModalShare: React.FC<ModalShareProps> = ({
  open,
  setOpenShareModal,
  loading,
  data,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({});

  return (
    <S.Modal opacity={open ? "1" : "0"}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Enviar SMS:</S.Title>
        <S.IconClose onClick={() => setOpenShareModal(false)}>x</S.IconClose>
        <Row>
          <Column width="100%">
            <Label htmlFor="data.phone_number">Celular:</Label>
            <Input
              defaultValue={data?.phone_number ? data?.phone_number : ""}
              {...register("data.phone_number")}
            />
          </Column>
        </Row>
        <Row>
          <Column width="100%">
            <Label htmlFor="data.message">Mensagem:</Label>
            <TextArea width="100%" height="100px" {...register("message")} />
          </Column>
        </Row>
        <S.ButtonContainer>
          <Button
            color={colors.mediumBlue}
            width="100%"
            type="submit"
            disabled={isSubmitting}
          >
            {loading ? (
              <Spinner
                size="35px"
                color="#fff"
                style={{ position: "absolute", top: "65%", left: "50%" }}
              />
            ) : (
              "Enviar"
            )}
          </Button>
        </S.ButtonContainer>
      </Form>
    </S.Modal>
  );
};

export default ModalShare;
