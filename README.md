## Seguridad

Este proyecto usa Gatsby 5.14.1, que depende de algunas bibliotecas con vulnerabilidades conocidas (como `cookie` < 0.7.0). 
Estas vulnerabilidades están presentes en dependencias indirectas de Gatsby y serán corregidas en futuras versiones del ecosistema. 
Este proyecto no ejecuta código del lado del servidor, por lo que el riesgo es mínimo en entornos locales de desarrollo o demostración.

En un entorno de producción real, se tomarían medidas como:

- Actualizar versiones seguras cuando estén disponibles
- Reemplazar dependencias vulnerables por alternativas seguras
- Analizar las advertencias con herramientas como `npm audit`, `Snyk` o `OSV-Scanner`