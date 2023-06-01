// 列表区可以显示所有的物料
// key对应的组件映射关系 
import { ElButton, ElInput, ElOption, ElSelect } from 'element-plus'
import Range from '../components/Range'
import { useStore } from 'vuex';
import $http from '../http'

// const label = '';
// const key = '';
// const render = null;
// const preview = null;

function createEditorConfig() {
    const componentList = [];
    const componentMap = {} 
    // getComponents();

    return {
        componentList,
        componentMap,
        register: (component) => {
            console.log(component)
            componentList.push(component);
            componentMap[component.key] = component;
            console.log(componentList)
        }
    }
}

export let registerConfig = createEditorConfig();
const createInputProp = (label) => ({ type: 'input', label });
const createColorProp = (label) => ({ type: 'color', label });
const createSelectProp = (label, options) => ({ type: 'select', label, options })
const createTableProp = (label, table) => ({ type: 'table', label, table })

const store = useStore();
console.log(store)
/* let component = store.state.components;
registerConfig.register({
    label: component.label,
    preview: component.review,
    render: component.render,
    key: component.key
}) */

async function getComponents() {
    console.log($http)
    let res = await $http.get(`/rest/components`);
    res.data.map((item) => {
        let render = eval(item['render'])
        let preview = eval(item['preview'])
        let label = item['name']
        let key = item['key']
    
        registerConfig.register({
            label,
            key,
            render,
            preview
        })
    })

}

getComponents()

registerConfig.register({
    label: '盒子',
    preview: () => '基础盒子',
    render: ({ props }) => <div style={{ width:props.width, height:props.height, color: props.color, fontSize: props.size,backgroundColor: props.bgcolor, }}>{props.text || '渲染盒子'}</div>,
    key: 'box',
    props: {
        width: createInputProp('宽度'),
        height: createInputProp('高度'),
        size: createInputProp('字体大小'),
        text: createInputProp('文本'),
        color: createColorProp('字体颜色'),
        bgcolor: createColorProp('背景颜色'),
    }
})

registerConfig.register({
    label: '下拉框',
    preview: () => <ElSelect modelValue=""></ElSelect>,
    render: ({ props, model }) => {
        return <ElSelect {...model.default}>
            {(props.options || []).map((opt, index) => {
                return <ElOption label={opt.label} value={opt.value} key={index}></ElOption>
            })}
        </ElSelect>
    },
    key: 'select',
    props: { // [{label:'a',value:'1'},{label:'b',value:2}]
        options: createTableProp('下拉选项', {
            options: [
                { label: '显示值', field: 'label' },
                { label: '绑定值', field: 'value' },
            ],
            key: 'label' // 显示给用户的值 是label值
        })
    },
    model: {
        default: '绑定字段'
    }
})

registerConfig.register({
    label: '文本',
    preview: () => '预览文本',
    render: ({ props }) => <span style={{ color: props.color, fontSize: props.size }}>{props.text || '渲染文本'}</span>,
    key: 'text',
    props: {
        text: createInputProp('文本内容'),
        color: createColorProp('字体颜色'),
        size: createSelectProp('字体大小', [
            { label: '14px', value: '14px' },
            { label: '20px', value: '20px' },
            { label: '24px', value: '24px' },
        ])
    }
})

registerConfig.register({
    label: '播放器',
    preview: () => '播放器',
    render: ({ props }) => <div><video style={{ width:props.width, height:props.height }} src={props.src}  controls="controls">您的浏览器不支持 video 标签。
    </video></div>
    ,
    key: 'videoplayer',
    props: {
        src: createInputProp('视频链接'),
        width: createInputProp('宽度'),
        height: createInputProp('高度'),
    }
})

registerConfig.register({
    label: '页头',
    preview: () => <div>页头</div>,
    render: ({ props }) => <el-page-header icon={props.icon}>
        <template>
          <span class="text-large font-600 mr-3"> {props.title||'标题'} </span>
        </template>
    </el-page-header>,
    key: 'header',
    props: {
        title: createInputProp('标题'),
        icon: createSelectProp('图标', [
            { label: '图标1', value: 'ArrowLeft' },
        ])
    }
})

registerConfig.register({
    label: '消息提示',
    preview: () => <div>消息提示</div>,
    render: ({ props }) => <el-alert title="success alert" type="success" effect="dark" />,
    key: 'tip',
    props: {
        title: createInputProp('标题'),
        icon: createSelectProp('图标', [
            { label: '图标1', value: 'ArrowLeft' },
        ])
    }
})

registerConfig.register({
    label: '头像',
    preview: () => <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />,
    render: ({ props }) => <el-avatar src={props.src} />,
    key: 'avatar',
    props: {
        src: createInputProp('头像链接'),
    }
})

registerConfig.register({
    label: '图片组件',
    preview: () => <text>图片</text>,
    render: ({props}) => <div style={{ width: props.width, height: props.height }}><el-image
    src={props.src || 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'}
    fit="fit"></el-image></div>,
    key: 'image',
    props: {
        src: createInputProp('图片链接'),
        fit: createSelectProp('图片类型', [
            { label: 'fill', value: 'fill' },
            { label: 'contain', value: 'contain' },
            { label: 'cover', value: 'cover' },
            { label: 'none', value: 'none' },
            { label: 'scale-down', value: 'scale-down' },
        ]),
        width: createInputProp('宽'),
        height: createInputProp('高'),
    }
})

/* registerConfig.register({
    label: '测试',
    preview: () => <text>test</text>,
    render: ({props}) => <text>{props.text || 'test'}</text>,
    key: 'test',
    props: {
        text: createInputProp('文本内容'),
    }
}) */

registerConfig.register({
    label: '按钮',
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElButton>预览按钮</ElButton>,
    render: ({ props, size }) => <ElButton style={{ height: size.height + 'px', width: size.width + 'px' }} type={props.type} size={props.size}>{props.text || '渲染按钮'}</ElButton>,
    key: 'button',
    props: {
        text: createInputProp('按钮内容'),
        type: createSelectProp('按钮类型', [
            { label: '基础', value: 'primary' },
            { label: '成功', value: 'success' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' },
            { label: '文本', value: 'text' },
        ]),
        size: createSelectProp('按钮尺寸', [
            { label: '默认', value: '' },
            { label: '中等', value: 'medium' },
            { label: '小', value: 'small' },
            { label: '极小', value: 'mini' },
        ])
    }
})

registerConfig.register({
    label: '输入框',
    resize: {
        width: true, // 更改输入框的横向大小
    },
    preview: () => <ElInput placeholder="预览输入框"></ElInput>,
    render: ({ model, size }) => <ElInput placeholder="渲染输入框" {...model.default} style={{ width: size.width + 'px' }}></ElInput>,
    key: 'input',
    model: { // {default:'username'}
        default: '绑定字段'
    }
});

registerConfig.register({
    label: '日历',
    preview: () => <text>日历</text>,
    render: ({props}) => <div style={{ width: props.width, height: props.height }}><el-calendar></el-calendar></div>,
    key: 'calendar',
    props: {
        width: createInputProp('宽'),
        height: createInputProp('高'),
    }
})

registerConfig.register({
    label: '滑块',
    preview: () => <el-slider disabled/>,
    render: ({ props,model }) => <div style={{ width:props.width}}><el-slider v-model={model}/></div>,
    key: 'slider',
    props: {
        width: createInputProp('宽度'),
    },
    model: {
        default: '绑定字段'
    }
})

registerConfig.register({
    label: '开关',
    preview: () => <el-switch disabled/>,
    render: ({ props,model }) => <div><el-switch size={props.size} v-model={model}/></div>,
    key: 'testbox',
    props: {
        size: createSelectProp('尺寸大小', [
            { label: '大', value: 'large' },
            { label: '默认', value: 'default' },
            { label: '小', value: 'small' },
        ])
    },
    model: {
        default: '绑定字段'
    }
})

registerConfig.register({
    label: '范围选择器',
    preview: () => <Range placeholder="预览输入框"></Range>,
    render: ({ model }) => {
        return <Range {...{
            start: model.start.modelValue, // @update:start
            end: model.end.modelValue,
            'onUpdate:start': model.start['onUpdate:modelValue'],
            'onUpdate:end': model.end['onUpdate:modelValue']
        }}></Range>
    },
    model: {
        start: '开始范围字段',
        end: '结束范围字段'
    },
    key: 'range',
});

registerConfig.register({
    label: '计数器',
    preview: () => <el-input-number min='1' max='10' label='计数器'></el-input-number>,
    render: ({ props,model }) => <el-input-number v-model={model} min={props.min} max={props.max} label={props.label}></el-input-number>,
    key: 'numberbox',
    props: {
        min: createInputProp('最小值'),
        max: createInputProp('最大值'),
        label: createInputProp('描述文字'),
    },
    model: {
        default: '绑定字段'
    }
})

registerConfig.register({
    label: '取色器',
    preview: () => <el-color-picker/>,
    render: ({model}) => <el-color-picker {...model.default} />,
    key: 'colorpicker',
    model: {
        default: '绑定字段'
    }
})

registerConfig.register({
    label: '评分器',
    preview: () => <el-rate/>,
    render: ({model}) => <el-rate {...model.default}/>,
    key: 'rate',
    model: {
        default: '绑定字段'
    }
})

registerConfig.register({
    label: '折叠面板',
    preview: () => <div>折叠面板</div>,
    render: ({props,model}) => 
    <el-collapse v-model={model}>
        <el-collapse-item title="Consistency">
          <div>
            {props.content}
          </div>
        </el-collapse-item>
    </el-collapse>,
    key: 'collapse',
    model: {
        default: '绑定字段'
    },
    props: {
        content: createInputProp('内容'),
    }
})

// model:{// {start:'start',end:'end'}
//     start:'开始字段',
//     end:'结束字段'
// }