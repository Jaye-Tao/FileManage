package cn.com.bizunited.cp.pay.file.manger.util.redis;

import redis.clients.jedis.*;

import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

public class RedisPool {

	/**
	 * redis缓存连接池
	 */
	private static JedisPool redisPool;
	/**
	 * 集群redisPool
	 */
	private static ShardedJedisPool shardedRedisPool;
	
	private static ResourceBundle redisRB = ResourceBundle.getBundle("redis-cache");

	/**私有化构造器*/
	private RedisPool(){
	}
	
	static{
		init();
	}
	
	/**
	 * 初始化连接池
	 */
	private static void init(){
		JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();  
        // 控制一个pool最多有多少个状态为idle的jedis实例  
        jedisPoolConfig.setMaxIdle(Integer.valueOf(redisRB.getString("redis.pool.maxIdle").trim()));  
        jedisPoolConfig.setMinIdle(Integer.valueOf(redisRB.getString("redis.pool.maxIdle").trim())/2);
        // 最大能够保持空闲状态的对象数  
        jedisPoolConfig.setMaxTotal(Integer.valueOf(redisRB.getString("redis.pool.maxIdle").trim())*3);  
        // 超时时间  
        jedisPoolConfig.setMaxWaitMillis(2000);  
        // 在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
        jedisPoolConfig.setTestOnBorrow(true);  
        // 在还会给pool时，是否提前进行validate操作  
        jedisPoolConfig.setTestOnReturn(true); 
        jedisPoolConfig.setTimeBetweenEvictionRunsMillis(Long.valueOf(redisRB.getString("redis.pool.timeBetweenEvictionRunsMillis").trim()));
        jedisPoolConfig.setMinEvictableIdleTimeMillis(Long.valueOf(redisRB.getString("redis.pool.minEvictableIdleTimeMillis").trim()));
        String host = redisRB.getString("redis.host-name");//"localhost";
        int port = Integer.parseInt(redisRB.getString("redis.port").trim());//6379;  
        int timeout = 2000;//2000; 
        List<JedisShardInfo> jdsInfoList =new ArrayList<JedisShardInfo>();
        JedisShardInfo info = new JedisShardInfo(host, port);
        jdsInfoList.add(info);
        shardedRedisPool = new ShardedJedisPool(jedisPoolConfig, jdsInfoList);
        redisPool = new JedisPool(jedisPoolConfig, host, port, timeout, "root");
	}
	
	/**
	 * 获取缓存实例
	 * @return
	 */
	public static Jedis getRedis(){
		return redisPool.getResource();
	}
	
	/**
	 * redis集群版
	 * @return
	 */
	public static ShardedJedis getShardedRedis(){
		return shardedRedisPool.getResource();
	}
	
	/**
	 * 还原缓存链接实例到连接池
	 * @param redis
	 */
	public static void returnRidesTuResource(Jedis redis,boolean isBroken){
		if(isBroken)
			redisPool.returnBrokenResource(redis);
		else
			redisPool.returnResource(redis);
	}
}
