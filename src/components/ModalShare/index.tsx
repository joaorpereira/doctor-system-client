import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Spinner, Label, Input, TextArea } from "../../components";
import { useOnClickOutside } from "../../hooks";
import { Client } from "../../store/ducks/clientsSlice";
import { colors, Column, Form, Row } from "../../styles";
import { formatPhone } from "../../utils";
import * as S from "./styled";

type ModalShareProps = {
  open: boolean;
  loading: boolean;
  onSubmit: () => void;
  data:
    | Client
    | {
        phone_number?: string;
      };
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

  const ref = useRef();
  useOnClickOutside({ ref, handler: () => setOpenShareModal(false) });

  return (
    <S.Modal ref={ref} opacity={open ? "1" : "0"}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Enviar SMS:</S.Title>
        <S.IconClose onClick={() => setOpenShareModal(false)}>x</S.IconClose>
        <Row>
          <Column width="100%">
            <Label htmlFor="data.phone_number">Celular:</Label>
            <Input
              readOnly
              defaultValue={
                data?.phone_number ? formatPhone(data?.phone_number) : ""
              }
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
          <Row>
            <Column width="100%" margin="rigth">
              <Button
                color={colors.gray}
                width="100%"
                onClick={() => setOpenShareModal(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </Column>
            <Column width="100%" margin="left">
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
            </Column>
          </Row>
        </S.ButtonContainer>
      </Form>
    </S.Modal>
  );
};

export default ModalShare;
