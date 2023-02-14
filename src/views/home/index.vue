<template>
    <div class="container">
        <TopCard></TopCard>
        <SaleCard></SaleCard>
    </div>
</template>

<script>
import TopCard from "@/views/home/TopCard";
import SaleCard from "@/views/home/SaleCard";

export default {
  name: 'Home',
    components: {SaleCard, TopCard}
}
</script>

<style lang="less" scoped>
</style>
