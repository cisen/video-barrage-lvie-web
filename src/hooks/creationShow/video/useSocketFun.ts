import { Ref } from "vue";

//在线观看人数
export const numberOfViewers = (liveNumber: Ref<number>, people: number) => {
    liveNumber.value = people
}
