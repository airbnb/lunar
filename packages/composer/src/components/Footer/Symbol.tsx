import React from 'react';

export type SymbolProps = {
  char: string;
};

export default function Symbol({ char }: SymbolProps) {
  return (
    <small>
      <b>{char}</b>
    </small>
  );
}
