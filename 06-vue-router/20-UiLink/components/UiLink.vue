<script setup>
// Вместо <span> должен быть <RouterLink> или <a>
// Используйте динамический компонент <component :is="...">
import {computed} from "vue";

const props = defineProps({
  to: [String, Object],
  href: String,
  target: String,
})

const isRouterLink = computed(() => !!props.to)

const componentType  = computed(() => (
  isRouterLink.value ? 'RouterLink' : 'a'
));

const componentProps = computed(() => {
  if (isRouterLink.value) {
    return {
      to: props.to,
    };
  } else {
    return {
      href: props.href,
      target: props.target,
    };
  }
})
</script>

<template>
  <component
    :is="componentType "
    v-bind="componentProps"
    class="link"
    tabindex="0"
  >
    <slot></slot>
  </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
