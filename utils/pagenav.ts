/*
pagesize 每页条数
total    总条数
current  当前页
padding  理想中当前页的左右页数
*/
export const PageNav = (pagesize:number,total: number, current: number): number[] => {
    const padding = 3
    
    let i: number;
    const arr: number[] = []
    const page_count = Math.ceil(total / pagesize)

    //分页当前页的前后数量
    const left = current - padding
    const right = current + padding


    let min = left
    let max = right

    //如果起始页数小于1，则把不该存在的部分给结束页，并让起始页为1
    if (min < 1) {
        max += 1 - min
        min = 1
    }

    //如果结束页大于实际页数，则把起始页设置为多出的页数，结束页设置为最大页数
    if (max > page_count) {
        min -= max - page_count
        max = page_count
    }

    //上一步骤，可能把起始页再次变为小于1，如果发生这种状况，则把起始页设置为1
    if (min < 1) {
        min = 1
    }

    for (i = min; i <= max; i++) {
        arr.push(i)
    }
    return arr
}