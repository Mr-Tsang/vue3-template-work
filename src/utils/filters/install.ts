// 将过滤方法provide，通过inject使用
const filters = require.context('./', true, /\.ts$/);

export default {
    install(app: any) {
        filters.keys().forEach(fileName => {
            const content = filters(fileName).default;
            if (content) {
                for (const name in content) {
                    if (Object.hasOwnProperty.call(content, name)) {
                        app.provide(name, content[name]);
                    }
                }
            }
        });
    }
}