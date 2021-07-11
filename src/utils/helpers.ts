import { OptionType, timeOptions } from "./globalTypes";

export const formataCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const formataCNPJ = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const formatCPForCNPJ = (value: string) => {
  if (value.length <= 11) {
    return formataCPF(value);
  } else {
    return formataCNPJ(value);
  }
};

export const normalizeCPForCNPJ = (value: string) => {
  if (value.length < 15) {
    return formataCPF(value);
  } else {
    return formataCNPJ(value);
  }
};

export const formatCep = (value: string) => {
  return value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
};

export const formatPhone = (value: string) => {
  if (value.length === 12) {
    const newPhoneNumber = value.split("+")[1];
    return newPhoneNumber.replace(/^(\d{2})(\d{5})(\d{4}).*/, "+$1 $2-$3");
  }
  return value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "+$1 $2-$3");
};

export const maskDate = (value: string) => {
  const v: string = value.replace(/\D/g, "").slice(0, 10);
  if (v.length >= 5) {
    return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
  } else if (v.length >= 3) {
    return `${v.slice(0, 2)}/${v.slice(2)}`;
  }
  return v;
};

export const reversePhoneNumberFormat = (value: string) => {
  return (
    "+" +
    value
      .replace(/[^\w\s]/gi, "")
      .split(" ")
      .join("")
  );
};

export const reverseBirthDateFormat = (value: string) => {
  return value.split("/").reverse().join("-");
};

type DocumentProps = {
  type?: string;
  number: string;
};

export const reverseDocumentNumberFormat = (value: DocumentProps) => {
  const newDocumentNumber: DocumentProps = value;
  return newDocumentNumber.number.replace(/\D+/g, "");
};

export const formatDurationHour = (value: string): any => {
  const formatedDurationHour = timeOptions.find(
    (item) => item.value === value
  ) as OptionType;
  return value ? formatedDurationHour?.label : "";
};
