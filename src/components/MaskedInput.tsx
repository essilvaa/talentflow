
"use client";

import {
  forwardRef,
  type ComponentProps,
} from "react";

import { Input } from "@/components/ui/input";

type MaskedInputProps = Omit<
  ComponentProps<"input">,
  "onChange"
> & {
  mask: string;
  onChange: (value: string) => void;
};

function aplicarMascara(valor: string, mascara: string) {
  const numeros = valor.replace(/\D/g, "");
  let resultado = "";
  let indice = 0;

  for (const caractere of mascara) {
    if (indice >= numeros.length) break;

    if (caractere === "9") {
      resultado += numeros[indice];
      indice++;
    } else {
      resultado += caractere;
    }
  }

  return resultado;
}

const MaskedInput = forwardRef<
  HTMLInputElement,
  MaskedInputProps
>(({ mask, onChange, value, ...props }, ref) => {
  return (
    <Input
      {...props}
      ref={ref}
      value={value ?? ""}
      onChange={(event) => {
        const valorFormatado = aplicarMascara(
          event.target.value,
          mask
        );

        onChange(valorFormatado);
      }}
    />
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
