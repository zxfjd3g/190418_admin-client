# day01

## 1. 开发环境与生产环境
    1. 开发环境运行
        命令: npm start
        做了什么:
            1). 在内存中打包, 生成内存中的打包文件(html/js/css/img)
            2). 启动服务器, 运行内存中的打包文件 ===> 在浏览器中通过虚拟地址来访问得到相应的资源 
    2. 生产环境打包并运行
        命令:
            npm run build
            serve build
        使用了什么
            1). 在内存中打包, 生成内存中的打包文件(html/js/css/img)
            2). 将内存中的打包文件保存到本地
            3). 加载打包文件到内存
            4). 启动服务器运行 ===> 在浏览器中通过虚拟地址来访问得到相应的资源 

## 2. 几个重要概念
    1). 实例对象与函数对象
    2). 属性与方法
    3). 方法与函数

## 3. 项目开发准备
    1). 描述项目
    2). 技术选型 
    3). API接口/接口文档/测试接口
    
## 4. 启动项目开发
    1). 使用react脚手架创建项目
    2). 开发环境运行: npm start
    3). 生产环境打包运行: npm run build   serve build

## 5. git管理项目
    1). 创建远程仓库
    2). 创建本地仓库
        配置.gitignore
        git init
        git add .
        git commit -m "init"
    3). 将本地仓库推送到远程仓库
        git remote add origin url
        git push origin master
    4). 在本地创建dev分支, 并推送到远程
        git checkout -b dev
        git push origin dev
    5). 如果本地有修改
        git add .
        git commit -m "xxx"
        git push origin dev
    6). 新的同事: 克隆仓库
        git clone url
        git checkout -b dev origin/dev
        git push origin dev
    7). 如果远程修改了
        git pull origin dev
    8). 如何得到后面新增的远程分支
        git pull
        git checkout -b dev origin/xxx
        
## 6. 创建项目的基本结构
    api: ajax请求的模块
    components: 非路由组件
    pages: 路由组件
    App.js: 应用的根组件
    index.js: 入口js
    
## 7 引入antd
    下载antd的包
    按需打包: 只打包import引入组件的js/css
        下载工具包
        config-overrides.js
        package.json
    自定义主题
        下载工具包
        config-overrides.js
    使用antd的组件
        根据antd的文档编写
        
## 8. 引入路由
    下载包: react-router-dom
    拆分应用路由:
        Login: 登陆
        Admin: 后台管理界面
    注册路由:
        <BrowserRouter> / <HashRouter>
        <Switch>
        <Route path='' component={}/>
    路由匹配
        逐级路由匹配: 先匹配上一个1级路由==> 进入这个路由的组件==> 匹配其内部1个子路由
        只要匹配上一个, 后面的不看了
        默认是模糊(只匹配前面部分)
      
## 9. Login的静态组件
    1). 自定义了一部分样式布局
    2). 使用antd的组件实现登陆表单界面
      Form  / Form.Item
      Input
      Icon
      Button

## 10. 高阶函数与高阶组件
    1). 高阶函数
        定义: 接收的参数是函数或者返回值是函数
        常见的: 数组遍历相关的方法 / 定时器 / bind() / Promise / Form.create()(组件)
        作用: 实现一个更加强大, 动态的功能
    2). 高阶组件: 
        本质是一个函数
        函数接收一个组件, 返回一个新的组件
        常见的高阶组件:
            Form.create()返回的就是一个高阶组件 :  Form.create()(组件) 返回一个新的组件
            connect()返回的就是一个高阶组件: connect()(UI组件)返回容器组件
    
    3). 高阶组件与高阶函数的关系
        高阶组件是特别的高阶函数
        接收一个组件函数, 返回是一个新的组件函数

## 11. 收集表单数据和表单的前台验证
    1). form对象
        如何让包含<Form>的组件得到form对象?  WrapLoginForm = Form.create()(LoginForm)
        WrapLoginForm是LoginForm的父组件, 它给LoginForm传入form属性
        用到了高阶函数和高阶组件的技术
    
    2). 操作表单数据
        form.getFieldDecorator('标识名称', {initialValue: 初始值, rules: []})(<Input/>)包装表单项标签
        form.getFieldsValue(): 得到包含所有输入数据的对象
        form.getFieldValue(id): 根据标识得到对应字段输入的数据
 
    3). 前台表单验证
        a. 声明式实时表单验证:
            form.getFieldDecorator('标识名称', {rules: [{min: 4, message: '错误提示信息'}]})(<Input/>)
        b. 自定义表单验证
            form.getFieldDecorator('标识名称', {rules: [{validator: this.validatePwd}]})(<Input/>)
            validatePwd = (rule, value, callback) => {
              if(有问题) callback('错误提示信息') else callack()
            } 
        c. 点击登陆时统一验证
            form.validateFields((error, values) => {
              if(!error) {通过了验证, 发送ajax请求}
            })

# day02
## 1. 后台应用
    启动后台应用: mongodb服务必须启动
    使用postman测试接口(根据接口文档):
        访问测试: post请求的参数在body中设置
        保存测试接口
        导出/导入所有测试接口
        
## 2. 编写ajax代码
    1). ajax请求函数模块: api/ajax.js
        封装axios: interceptor + promise
        a. 解决post请求参数后台不能读取问题: axios默认以json形参传递请求体参数, 在请求拦截器中转换成urlencode形式
        b. 请求成功的结果不再是response, 而是reponse.data: 使用响应拦截器成功的回调返回response.data
        c. 内部统一处理请求异常: 在响应拦截失败的回调中返回pending状态的promise, 中断promise链

    2). 接口请求函数模块: api/index.js
        根据接口文档编写(一定要具备这个能力)
        接口请求函数: 调用ajax模块发请求, 返回值promise对象

    3). 解决ajax跨域请求问题(开发时)
        办法: 配置代理  ==> 开发的配置不能用于生产环境   webpack-dev-server  ==> http-proxy-middleware
        编码: package.json: proxy: "http://localhost:5000"

    4). 对代理的理解
        a. 是什么?
            具有特定功能的程序: webpack-dev-server ==> http-proxy-middleware
        b. 运行在哪?
            前台应用端, 不在后台应用端
            只能在开发时使用
        c. 作用?
            解决开发时的ajax请求跨域问题
            a. 监视并拦截请求(3000)
            b. 转发请求(4000)
        d. 配置代理
            告诉代理服务器一些信息: 比如转发的目标地址
            开发环境: 前端工程师
            生产环境: 后端工程师
    5). async和await的理解和使用
        a. 作用?
           简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
           以同步编码(没有回调函数了)方式实现异步流程
        b. 哪里写await?
            在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
        c. 哪里写async?
            await所在函数(最近的)定义的左侧写async

## 3. 实现登陆(包含自动登陆)
    login.jsx
        1). 调用登陆的接口请求
        2). 如果失败, 显示错误提示信息
        3). 如果成功了:
            保存user到local/内存中
            跳转到admin
        4). 如果内存中的user有值, 自动跳转到admin
    admin.jsx
        判断如果内存中没有user(_id没有值), 自动跳转到login
    storageUtils.js
        包含使用localStorage来保存user相关操作的工具模块
        使用第三库store
            简化编码
            兼容不同的浏览器
    memoryUtils.js
        用来在内存中保存数据(user)的工具类, user的初始值从local中读取
