<script setup lang="ts">
useSeoMeta({
  title: 'Frontend',
  description: 'Welcome to the frontend application'
})
</script>

<template>
  <UPage>
    <UPageHeader title="Welcome" description="This frontend will connect to the backend API" />
    <UPageBody>
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Getting Started</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-400">
          This is a clean Nuxt frontend ready to connect to your NestJS backend API.
        </p>
      </UCard>
    </UPageBody>
  </UPage>
</template>
