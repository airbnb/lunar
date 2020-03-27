import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconInstagram(props: Props) {
  return (
    <svg viewBox="0 0 64 64" xmlnsXlink="http://www.w3.org/1999/xlink" {...props}>
      <path fill="url(#pattern0)" d="M0 0H64V64H0z" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0" transform="scale(.01563)" />
        </pattern>
        <image
          id="image0"
          width="64"
          height="64"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEd0lEQVR4AeWbvaoVMRDH/6IiFoKt72BpoSC+iA9gZSdoIVaCD2DhCwj2XrC2EsHKxk7QWrGxFD/4hRPJiTO7k/3w7jkZODe52WRm/rO7ycwkK02jc5LuSHoo6bGkV5I+Svom6ffKP2QgC5nIRgd0QadV6bKk+5K+rgxwjgHRDR3RdTG6IunphkF7BkNndJ9FDw4QeG0QMDTTBUnPjgB8NgZYwBQiOr6cCP6npC+SPkv6IOm9pHfV77WkoV/dHx7wgie8kZGBtZRgChkhcue/SzrZTThnQmZdpxOymfTQBZ3GDAK2QRp75z9Juj3I4XQvohs6DhnCnROYMb2BvyQ9P11sTdLRFZ09PObq4C11MOLaoRE6e0b4Bw+Og2etQ7rz9U1Cdw/XnrPERGJ15H3aKp2X9KLQm5ViD9ROcW9OAPNf8tzbrU54Zwvg9Y2rjQCGug//gzkRQYTVgWVlq3TX0RkcPAk1eUtkCqCIpCwDsLZulSx9y7Zab7CU13Md7CmczA1lufeO1Bxn/M/ji+UvSboh6fquThvXIuTN7ln/moc3xxFKp5g6DyzLpT28J5J+DCxNyAYYfeg7RBit1LWsMzHWBJayT66TT0iJhdxQljWTqf/j20/x3xnDWIs8QOjP6mBRiS3XSaqk7EpuKEuLSUvbo93dLHlOqfNEwKsmjHCteKKYGIdeIUs2mSUzjYX15xDRniVwThs855D1FJJeMxUl7JxKbxyec8DnsfCeSmDKfMrSbCT2nkLRO/9W0k1JV3c/6rSVinn1qU8CmCyeZqPlTIwZhPfUElC23RpJSpCwoE85xqpbc8KYfmCyeJmNZGFaicnKEkAb6+3FBob0ZYzHD1mtBCaLn9noLT+eUPpbzGm75w0KtDPW47uUjqaAVubWDIviydMKAB3q4j0JrSuVd5NmGwCvzbtLLY+9ZwR4ePzHPMaS52oG8N59JrOlyJsYW+aCJgNElxo8Ly8wCaWggxaCl/UUIHvI+yvZe0u0yThqAC+XwJq+NHl+QorpA8JWMQAhrXVncGyWJnhastAhQqsYwAtL8fCWJnhaBkCHCK1iABIallLdGKD7V6D7SfBol8EWV/goHaEWA3TvCrMEdR0MYQDPz2aJPMhwuPuESPcpse6Tol2lxa3zva3ppjoY8QIPK26ItsFzDlkrVdoYYXvIUmKOMMauvTXWqp+FMW2NsUFoXWwV4PVnibSsb8ks2xjT4pB58nN7yTvX0+YoW8S5oSy3vD2eQUVLbzc5bY97aef/cUCCZAY/wuqWAxJR4Lnf4AGJQzwik4FFy8EjMl5Mv+VDUlHgud/gISk6HdoxuQwsUo4ek4OJ945s+aBkBDx9Qgcluz8qi6W6PiyNAbo/Lo8Ruv5gAgNAXX8ygwHYie36o6lshMiTUMYOW66DZdJ2/dicsGXQWTf3I6n0wgf+sDp4S2QWssUSnc2PowKYzS44S3iMntu8BSOgGzrWX42YgOY0EkARRRJKE1OTWCC7YqXXljYMMpCFTGSjA7qgUzP9ATtGuQ1vWMsiAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}

export default withIcon('IconInstagram')(IconInstagram);
