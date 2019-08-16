import { getUser } from "./storageUtils";

// 读取local中保存的user
const user = getUser()

export default {
  // 从local读取user, 保存在内存中
  user,
  product: {}, // 要显示的商品
}
