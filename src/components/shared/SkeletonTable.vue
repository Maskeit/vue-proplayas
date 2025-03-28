<template>
    <div class="skeleton-table">
        <div class="skeleton-row" v-for="row in rowsCount" :key="row">
            <div class="skeleton-cell" v-for="col in columnsCount" :key="col"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    rowsCount: { type: Number, required: true },
    columnsCount: { type: Number, required: true }
});
</script>

<style scoped>
.skeleton-table {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin:5rem auto ;
}

.skeleton-row {
    display: flex;
    gap: 10px;
}

.skeleton-cell {
    width: 100%;
    height: 20px;
    background: #e0e0e0;
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
    0% {
        background-color: #e0e0e0;
    }

    50% {
        background-color: #d6d6d6;
    }

    100% {
        background-color: #e0e0e0;
    }
}
</style>