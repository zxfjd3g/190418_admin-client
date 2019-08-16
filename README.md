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

# day03
## 1. LeftNav组件
    1). 使用antd的组件
        Menu / Menu.Item / Menu.SubMenu
    
    2). 使用react-router
        withRouter(): 包装非路由组件, 给其传入history/location/match属性
        history: push()/replace()/goBack()
        location: pathname属性
        match: params属性
    
    3). componentWillMount与componentDidMount的比较
        componentWillMount: 在第一次render()前调用一次, 为第一次render()准备数据(同步)
        componentDidMount: 在第一次render()之后调用一次, 启动异步任务, 后面异步更新状态重新render
    
    4). 根据配置数据动态生成Item和SubMenu的数组
        map() + 递归: 多级菜单列表
        reduce() + 递归: 多级菜单列表
    
    5). 2个问题?
        刷新时如何选中对应的菜单项?
            selectedKey是当前请求的path
        刷新子菜单路径时, 自动打开子菜单列表?
            openKey是 一级列表项的某个子菜单项是当前对应的菜单项

## 2. Header组件
    1). 界面静态布局
        三角形效果
    2). 获取登陆用户的名称显示
        MemoryUtils
    3). 当前时间
        循环定时器, 每隔1s更新当前时间状态
        格式化指定时间: dateUtils
    4). 天气预报
        使用jsonp库发jsonp请求百度天气预报接口
        对jsonp请求的理解
    5). 当前导航项的标题
        得到当前请求的路由path: withRouter()包装非路由组件
        根据path在menuList中遍历查找对应的item的title
    6). 退出登陆
        Modal组件显示提示
        清除保存的user
        跳转到login
    7). 抽取通用的类链接按钮组件
        通过...透传所有接收的属性: <Button {...props} />
        组件标签的所有子节点都会成为组件的children属性
        
## 3. jsonp解决ajax跨域的原理
    1). jsonp只能解决GET类型的ajax请求跨域问题
    2). jsonp请求不是ajax请求, 而是一般的get请求
    3). 基本原理
        浏览器端:
            动态生成<script>来请求后台接口(src就是接口的url)
            定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
        服务器端:
            接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
        浏览器端:
            收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据

# day04
## 1. Category组件使用antd组件构建分类列表界面
    Card
    Table
    Button
    Icon
    Modal
        
## 2. 相关接口请求函数
    获取全部分类列表
    添加分类
    更新分类
        
## 3. 异步显示分类列表    
    设计分类列表的状态: categorys
    异步获取分类列表: componentDidMount(){}
    更新状态显示

## 4. 添加分类
    1). 界面
        antd组件: Modal, Form, Input
        显示/隐藏: showStatus状态为1/0
        
    2). 功能
        父组(Category)件得到子组件(CategoryForm)的数据(form)
        调用添加分类的接口
        重新获取分类列表

## 5. 更新分类
    1). 界面
        antd组件: Modal, Form, Input
        显示/隐藏: showStatus状态为2/0
        
    2). 功能
        父组(Category)件得到子组件(CategoryForm)的数据(form)
        调用更新分类的接口
        重新获取分类列表
    3). 重要问题
        描述: <Input>指定initialValue后, 如果输入改变了, 再指定新的initialValue, 默认显示输入的值
        解决: 在关闭Modal时, 进行表单项重置: form.resetFields()


## 6. Product整体路由
    1). 配置子路由: 
        ProductHome / ProductDetail / ProductAddUpdate
        <Route> / <Switch> / <Redirect>
    
    2). 匹配路由的逻辑:
        默认: 逐层路由不完全匹配   <Route path='/product' component={ProductHome}/>
        exact属性: 完全匹配
        
## 7. 分页实现技术(2种)
    1). 前台分页
        请求获取数据: 一次获取所有数据, 翻页时不需要再发请求
        请求接口: 
            不需要指定请求参数: 页码(pageNum)和每页数量(pageSize)
            响应数据: 所有数据的数组
    
    2). 基于后台的分页
        请求获取数据: 每次只获取当前页的数据, 翻页时要发请求
        请求接口: 
            需要指定请求参数: 页码(pageNum)和每页数量(pageSize)
            响应数据: 当前页数据的数组 + 总记录数(total)
    
    3). 如何选择?
        基本根据数据多少来选择
        
## 8. ProductHome组件
    1). 分页显示
       界面: <Card> / <Table> / Select / Icon / Input / Button
       状态: products / total
       接口请求函数需要的数据: pageNum, pageSize
       异步获取第一页数据显示
           调用分页的接口请求函数, 获取到当前页的products和总记录数total
           更新状态: products / total
       翻页:
           绑定翻页的监听, 监听回调需要得到pageNum
           异步获取指定页码的数据显示 

# day05
## 1. ProductHome组件
    2). 搜索分页
       接口请求函数需要的数据: 
           pageSize: 每页的条目数
           pageNum: 当前请求第几页 (从1开始)
           productDesc / productName: searchName 根据商品描述/名称搜索
       状态:  searchType / searchName  / 在用户操作时实时收集数据
       异步搜索显示分页列表
           如果searchName有值, 调用搜索的接口请求函数获取数据并更新状态
           
    3). 更新商品的状态
       初始显示: 根据product的status属性来显示  status = 1/2
       点击切换:
           绑定点击监听
           异步请求更新状态
    
    4). 进入详情界面
        memoryUtils.product = product
        history.push('/product/detail')
    5). 进入添加界面
        memoryUtils.product = null
        history.push('/product/addupdate')
    6). 进入修改界面
        memoryUtils.product = product
        history.push('/product/addupdate')

## 2. ProductDetail组件
    1). 读取商品数据: memoryUtils.product
    2). 显示商品信息: <Card> / List 
    3). 异步显示商品所属分类的名称

## 3. ProductAddUpdate
    1). 基本界面
        Card / Form / Input / TextArea / Button
        FormItem的label标题和layout
    2). 分类下拉列表的异步显示
    3). 表单数据收集与表单验证
    
## 4. PicturesWall
    1). antd组件
        Upload / Modal / Icon
        根据示例DEMO改造编写
    2). 上传图片
        在<Upload >上配置接口的path和请求参数名
        监视文件状态的改变: 上传中 / 上传完成/ 删除
        在上传成功时, 保存好相关信息: name / url
        为父组件提供获取已上传图片文件名数组的方法
    3). 删除图片
        当文件状态变为删除时, 调用删除图片的接口删除上传到后台的图片
    4). 父组件调用子组件对象的方法: 使用ref技术
        a. 创建ref容器: thi.pw = React.createRef()
        b. 将ref容器交给需要获取的标签元素: <PicturesWall ref={this.pw} />  
        c. 通过ref容器读取标签元素: this.pw.current
