import { createClient } from '@supabase/supabase-js'

// 从环境变量读取（如果运行不了，直接写死在这里测试）
const supabaseUrl = 'https://bzspxbtwttkxyiatyaes.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6c3B4YnR3dHRreHlpYXR5YWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzQ4MjcsImV4cCI6MjA3ODYxMDgyN30.2ZQ1QhYuUNJWWiBnKRQduQP12760RAsaFwIWEVGk3fY'

console.log('🔍 测试 Supabase 连接...\n')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey.substring(0, 20) + '...\n')

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    try {
        console.log('1️⃣ 测试基础连接...')

        // 测试1: 获取所有文章
        console.log('\n📝 尝试获取所有文章 (SELECT * FROM posts)...')
        const { data: allPosts, error: error1 } = await supabase
            .from('posts')
            .select('*')

        if (error1) {
            console.error('❌ 错误:', error1)
            console.error('   错误详情:', JSON.stringify(error1, null, 2))
        } else {
            console.log('✅ 成功获取数据!')
            console.log('   数据条数:', allPosts?.length || 0)
            if (allPosts && allPosts.length > 0) {
                console.log('   数据预览:', JSON.stringify(allPosts, null, 2))
            } else {
                console.log('   ⚠️  数据库是空的，没有文章')
            }
        }

        // 测试2: 只获取字段列表
        console.log('\n📊 尝试获取字段信息 (SELECT id, created_at FROM posts)...')
        const { data: fields, error: error2 } = await supabase
            .from('posts')
            .select('id, created_at')
            .limit(1)

        if (error2) {
            console.error('❌ 错误:', error2)
        } else {
            console.log('✅ 成功!')
            console.log('   字段:', fields)
        }

        // 测试3: 检查表是否存在
        console.log('\n🔍 检查表结构...')
        const { data: tableInfo, error: error3 } = await supabase
            .from('posts')
            .select('*')
            .limit(0)

        if (error3) {
            console.error('❌ 表可能不存在或无权限:', error3)
        } else {
            console.log('✅ 表存在且可访问')
        }

        // 测试4: 尝试插入测试数据
        console.log('\n➕ 尝试插入测试数据...')
        const { data: newPost, error: error4 } = await supabase
            .from('posts')
            .insert({
                title: '测试文章 ' + new Date().toLocaleTimeString(),
                description: '这是一篇测试文章',
                content: '测试内容',
                author: 'Test Script',
                tags: ['测试'],
                published: true
            })
            .select()

        if (error4) {
            console.error('❌ 插入失败:', error4)
            console.error('   可能原因: 缺少字段或RLS策略阻止')
        } else {
            console.log('✅ 插入成功!')
            console.log('   新文章:', newPost)
        }

        // 再次查询确认
        console.log('\n🔄 再次查询所有数据...')
        const { data: finalCheck, error: error5 } = await supabase
            .from('posts')
            .select('*')

        if (error5) {
            console.error('❌ 错误:', error5)
        } else {
            console.log('✅ 最终数据条数:', finalCheck?.length || 0)
            if (finalCheck && finalCheck.length > 0) {
                console.log('   所有文章标题:')
                finalCheck.forEach((post, i) => {
                    console.log(`   ${i + 1}. ${post.title} (id: ${post.id})`)
                })
            }
        }

    } catch (err) {
        console.error('\n💥 发生异常:', err)
    }
}

console.log('开始测试...\n')
testConnection().then(() => {
    console.log('\n✅ 测试完成!')
    process.exit(0)
}).catch(err => {
    console.error('\n❌ 测试失败:', err)
    process.exit(1)
})
