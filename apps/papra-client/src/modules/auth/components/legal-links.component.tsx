import type { Component } from 'solid-js';
import { useConfig } from '@/modules/config/config.provider';
import { createVitrineUrl } from '@/modules/shared/utils/urls';
import { Button } from '@/modules/ui/components/button';
import { A } from '@solidjs/router';

export const AuthLegalLinks: Component = () => {
  const { config } = useConfig();

  if (!config.auth.showLegalLinksOnAuthPage) {
    return null;
  }

  return (
    <p class="text-muted-foreground mt-2">
      By continuing, you acknowledge that you understand and agree to the
      {' '}
      <Button variant="link" as={A} class="inline px-0" href={createVitrineUrl({ path: 'terms-of-service' })}>Terms of Service</Button>
      {' '}
      and
      {' '}
      <Button variant="link" as={A} class="inline px-0" href={createVitrineUrl({ path: 'privacy-policy' })}>Privacy Policy</Button>
      .
    </p>
  );
};
