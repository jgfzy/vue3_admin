import login from "@/views/login/index.vue";
import home from "@/views/home/index.vue";
import layout from "@/layout/index.vue";
import notfound from "@/views/404/index.vue";
import screen from "@/views/screen/index.vue";
import user from "@/views/acl/user/index.vue";
import role from "@/views/acl/role/index.vue";
import permission from "@/views/acl/role/index.vue";
import trademark from "@/views/product/trademark/index.vue";
import attr from "@/views/product/attr/index.vue";
import spu from "@/views/product/spu/index.vue";
import sku from "@/views/product/sku/index.vue";

export const constantRoutes = [
  {
    name: "login",
    path: "/login",
    component: login,
    meta: {
      //菜单标题
      title: "登录",
      //菜单是否隐藏
      hidden: true,
      //菜单左侧文字图标el-icon
      icon: "CirclePlus",
    },
  },
  {
    name: "layout",
    path: "/",
    component: layout,
    meta: {
      title: "layout",
      hidden: false,
      icon: "HomeFilled",
    },
    redirect: "/home",
    children: [
      {
        name: "home",
        path: "/home",
        component: home,
        meta: {
          title: "首页",
          hidden: false,
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    name: "404",
    path: "/404",
    component: notfound,
    meta: {
      title: "404",
      hidden: true,
      icon: "CirclePlus",
    },
  },
  {
    name: "screen",
    path: "/screen",
    component: screen,
    meta: {
      hidden: false,
      title: "数据大屏",
      icon: "Platform",
    },
  },
  {
    name: "Acl",
    path: "/acl",
    component: layout,
    meta: {
      hidden: false,
      title: "权限管理",
      icon: "Lock",
    },
    //当跳转到一级路由时自动转到以及路由下的第一个子路由
    redirect: "/acl/user",
    //子路由
    children: [
      {
        name: "acl",
        path: "/acl/user",
        component: user,
        meta: {
          hidden: false,
          title: "用户管理",
          icon: "User",
        },
      },
      {
        name: "Role",
        path: "/acl/role",
        component: role,
        meta: {
          hidden: false,
          title: "角色管理",
          icon: "UserFilled",
        },
      },
      {
        name: "permission",
        path: "/acl/permission",
        component: permission,
        meta: {
          hidden: false,
          title: "菜单管理",
          icon: "List",
        },
      },
    ],
  },
  {
    name: "Product",
    path: "/product",
    component: layout,
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "Goods",
    },
    redirect: "/product/trademark",
    children: [
      {
        name: "Trademark",
        path: "/product/trademark",
        component: trademark,
        meta: {
          title: "品牌管理",
          hidden: false,
          icon: "ShoppingCartFull",
        },
      },
      {
        name: "Attr",
        path: "/product/attr",
        component: attr,
        meta: {
          title: "属性管理",
          hidden: false,
          icon: "ChromeFilled",
        },
      },
      {
        name: "Spu",
        path: "/product/spu",
        component: spu,
        meta: {
          title: "SPU管理",
          hidden: false,
          icon: "Calendar",
        },
      },
      {
        name: "Sku",
        path: "/product/sku",
        component: sku,
        meta: {
          title: "SKU管理",
          hidden: false,
          icon: "Orange",
        },
      },
    ],
  },
  {
    name: "any",
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: {
      title: "任意路由",
      hidden: true,
      icon: "CirclePlus",
    },
  },
];
