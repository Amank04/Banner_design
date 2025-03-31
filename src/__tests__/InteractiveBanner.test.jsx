import React from 'react';
import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InteractiveBanner from '../InteractiveBanner';

// Stub URL.createObjectURL and URL.revokeObjectURL for file upload tests
beforeAll(() => {
  global.URL.createObjectURL = vi.fn().mockImplementation((file) => `blob:${file.name}`);
  global.URL.revokeObjectURL = vi.fn();
});

describe('InteractiveBanner', () => {
  it('renders the banner container with default text', () => {
    render(<InteractiveBanner />);
    const container = screen.getByTestId('interactive-banner-container');
    expect(container).toBeInTheDocument();
    expect(screen.getByText('Exploring new places is my passion!')).toBeInTheDocument();
  });

  it('toggles the settings panel on toggle button click', async () => {
    render(<InteractiveBanner />);
    // Initially, the Settings panel should not be visible.
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();

    // The first button rendered is the toggle button.
    const toggleButton = screen.getAllByRole('button')[0];

    // Open the settings panel.
    await userEvent.click(toggleButton);
    expect(screen.getByText('Settings')).toBeInTheDocument();

    // Close the settings panel.
    await userEvent.click(toggleButton);
    await waitForElementToBeRemoved(() => screen.queryByText('Settings'));
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('toggles dark mode when the switch is clicked', async () => {
    render(<InteractiveBanner />);
    // Open the settings panel.
    const toggleButton = screen.getAllByRole('button')[0];
    await userEvent.click(toggleButton);

    // Find the dark mode switch using its aria-label.
    const darkModeSwitch = screen.getByLabelText('Dark mode switch');
    const container = screen.getByTestId('interactive-banner-container');

    // Ensure the container does not initially have the "dark" class.
    expect(container.className).not.toContain('dark');

    // Click the dark mode switch.
    await userEvent.click(darkModeSwitch);
    expect(container.className).toContain('dark');
  });

  it('renders an image banner when a background image is provided via file upload', async () => {
    render(<InteractiveBanner />);
    // Initially, no image should be rendered.
    expect(screen.queryByRole('img', { name: 'Banner' })).not.toBeInTheDocument();

    // Open the settings panel.
    const toggleButton = screen.getAllByRole('button')[0];
    await userEvent.click(toggleButton);

    // Find the file input by its label.
    const fileInput = screen.getByLabelText('Upload Image');

    // Create a dummy file.
    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' });

    // Simulate file upload.
    await userEvent.upload(fileInput, file);

    // Expect that an image with alt text "Banner" is now rendered.
    expect(await screen.findByRole('img', { name: 'Banner' })).toBeInTheDocument();
  });
});
