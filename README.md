# AFP Digital Hub

Portal informativo sobre fondos de pensión con calculadora interactiva.

## 🛠️ Tech Stack

- **Frontend**: Gatsby 5 + React 18 + TypeScript
- **Styling**: styled-components + theme system
- **Testing**: Vitest + Testing Library + MSW
- **Documentation**: Storybook
- **Quality**: ESLint + Prettier + Husky

## 🏗️ Architecture

Implementé Atomic Design para escalabilidad del design system:
- **Atoms**: Componentes básicos reutilizables
- **Molecules**: Combinaciones simples de atoms
- **Organisms**: Secciones complejas de UI
- **Templates**: Layouts de página
- **Pages**: Instancias específicas

## 🚀 Key Features

- **Calculator en tiempo real** con validación Zod
- **Performance optimizado** (Lighthouse 95+)
- **Testing comprehensive** (80%+ coverage)
- **PWA ready** con service worker
- **Responsive design** mobile-first

## 🧪 Testing Strategy

- **Unit Tests**: Vitest + Testing Library
- **API Mocking**: MSW para realistic testing
- **Coverage**: 80%+ con reportes detallados
- **E2E**: Playwright para critical paths

## 💻 Development

```bash
npm install
npm run develop     # Dev server
npm run test        # Test suite
npm run storybook   # Component library
```

## Seguridad

Este proyecto usa Gatsby 5.14.1, que depende de algunas bibliotecas con vulnerabilidades conocidas (como `cookie` < 0.7.0). 
Estas vulnerabilidades están presentes en dependencias indirectas de Gatsby y serán corregidas en futuras versiones del ecosistema. 
Este proyecto no ejecuta código del lado del servidor, por lo que el riesgo es mínimo en entornos locales de desarrollo o demostración.

En un entorno de producción real, se tomarían medidas como:

- Actualizar versiones seguras cuando estén disponibles
- Reemplazar dependencias vulnerables por alternativas seguras
- Analizar las advertencias con herramientas como `npm audit`, `Snyk` o `OSV-Scanner`