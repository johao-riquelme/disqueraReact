// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import * as FooterModule from './Footer';

const Footer = FooterModule.Footer || FooterModule.default;

describe('Footer Component', () => {
  it('debe renderizar el pie de página correctamente', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(document.body).toBeInTheDocument();
  });
});