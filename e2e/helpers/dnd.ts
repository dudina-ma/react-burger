import type { Locator, Page } from '@playwright/test';

export const dragAndDrop = async (
  page: Page,
  source: Locator,
  target: Locator
): Promise<void> => {
  await source.scrollIntoViewIfNeeded();
  await target.scrollIntoViewIfNeeded();

  const targetHandle = await target.elementHandle();

  if (!targetHandle) {
    throw new Error('Не удалось найти целевой элемент для перетаскивания');
  }

  await source.evaluate((sourceElement, targetElement) => {
    const dataTransfer = new DataTransfer();

    sourceElement.dispatchEvent(
      new DragEvent('dragstart', { bubbles: true, cancelable: true, dataTransfer })
    );
    targetElement.dispatchEvent(
      new DragEvent('dragenter', { bubbles: true, cancelable: true, dataTransfer })
    );
    targetElement.dispatchEvent(
      new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer })
    );
    targetElement.dispatchEvent(
      new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer })
    );
    sourceElement.dispatchEvent(
      new DragEvent('dragend', { bubbles: true, cancelable: true, dataTransfer })
    );
  }, targetHandle);

  await targetHandle.dispose();
};
