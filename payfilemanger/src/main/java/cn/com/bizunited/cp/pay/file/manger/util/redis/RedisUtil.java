package cn.com.bizunited.cp.pay.file.manger.util.redis;

import cn.com.bizunited.cp.pay.file.manger.util.redis.RedisPool;
import org.apache.commons.codec.binary.Base64;
import redis.clients.jedis.Jedis;

import java.io.*;
import java.util.*;
import java.util.Map.Entry;

/**
 * redis缓存工具类
 *
 * @author bruce.qin
 */
public class RedisUtil {

    /**
     * 保存方式
     */
    public enum SetType {
        /**
         * 只保存已经存在的key
         */
        saveExistKey("XX"),
        /**
         * 只保存不存在的key
         */
        saveNotExistKey("NX");

        private String value;

        public String getValue() {
            return value;
        }

        private SetType(String value) {
            this.value = value;
        }

    }

    /**
     * 过期时间类型
     */
    public enum TimeType {
        /**
         * 秒
         */
        seconds("EX"),
        /**
         * 毫秒
         */
        milliseconds("PX");

        private String value;

        public String getValue() {
            return value;
        }

        private TimeType(String value) {
            this.value = value;
        }
    }

    /**
     * 设置字符串
     *
     * @param key
     * @param value
     */
    public static void setString(String key, String value) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            redis.set(key, value);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    private static Integer LOCKKEY_EXPIRE_TIME = 1;

    /**
     * 设置缓存过期，在seconds后过期
     *
     * @param key     缓存key
     * @param seconds 秒
     */
    public static void expire(String key, int seconds) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            if (redis.exists(key.getBytes()))
                redis.expire(key.getBytes(), seconds);
            if (redis.exists(key))
                redis.expire(key, seconds);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 设置缓存过期，在毫秒时间戳时间时过期
     *
     * @param key                   缓存key
     * @param millisecondsTimestamp 时间戳（毫秒型）
     */
    public static void expireAt(String key, long millisecondsTimestamp) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            if (redis.exists(key.getBytes()))
                redis.pexpireAt(key.getBytes(), millisecondsTimestamp);
            if (redis.exists(key))
                redis.pexpireAt(key, millisecondsTimestamp);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 设置字符串
     *
     * @param key
     * @param value
     * @param setType  保存方式
     * @param timeType 过期时间类型
     * @param time     过期时间
     */
    public static void setString(String key, String value, SetType setType, TimeType timeType, long time) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            redis.set(key, value, setType.getValue(), timeType.getValue(), time);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * redis公共mapSet
     *
     * @param key
     * @param value
     */
    public static void mset(String key, String value) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            redis.mset(key, value);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * redis公共mapSet
     *
     * @param map
     */
    public static void mset(Map<String, String> map) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            if (!(map == null || map.isEmpty())) {
                List<String> list = new ArrayList<String>();
                for (Entry<String, String> entry : map.entrySet()) {
                    list.add(entry.getKey());
                    list.add(entry.getValue());
                }
                redis.mset(list.toArray(new String[2 * map.size()]));
            }
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * redis 公共map获取key-value
     *
     * @param key
     * @return
     */
    public static String mget(String key) {
        boolean broken = false;
        Jedis redis = RedisPool.getRedis();
        List<String> list = null;
        try {
            list = redis.mget(key);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
        return (list == null || list.isEmpty()) ? null : list.get(0);
    }

    /**
     * redis 公共map获取key-value
     *
     * @return
     */
    public static List<String> mget(String... keys) {
        boolean broken = false;
        Jedis redis = RedisPool.getRedis();
        List<String> list = null;
        try {
            list = redis.mget(keys);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
        return list;
    }

    /**
     * 保存map
     *
     * @param key
     * @param map
     */
    public static void setMap(String key, Map<String, String> map) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            redis.hmset(key, map);
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 获取字符串
     *
     * @param key
     * @return
     */
    public static String getString(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            return redis.get(key);
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
            return null;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 获取Map值
     *
     * @param key
     * @param mapKey
     * @return
     */
    public static String getMapValue(String key, String mapKey) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            return redis.hmget(key, mapKey).get(0);
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
            return null;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * map设置
     *
     * @param key
     * @param mapKey
     * @param value
     */
    public static void setMap(String key, String mapKey, String value) {
        Map<String, String> map = new HashMap<String, String>();
        map.put(mapKey, value);
        setMap(key, map);
    }

    /**
     * 获取Map的keys
     *
     * @param key
     * @return
     */
    public static Set<String> getMapKeys(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            return redis.hkeys(key);
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
            return new HashSet<String>();
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 获取Map的vlues
     *
     * @param key
     * @return
     */
    public static List<String> getMapVlues(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            return redis.hvals(key);
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
            return new ArrayList<String>();
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 删除Map中的一个key-value
     *
     * @param key
     */
    public static void deleteMapKeyValu(String key, String... mapkeys) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            if (key != null && mapkeys != null && mapkeys.length > 0)
                redis.hdel(key, mapkeys);
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 销毁缓存
     *
     * @param keys
     */
    public static void destory(String... keys) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            if (keys != null && keys.length > 0) {
                List<String> strkeys = new ArrayList<String>();
                List<byte[]> bytekeys = new ArrayList<byte[]>();
                for (String key : keys) {
                    if (redis.exists(key))
                        strkeys.add(key);
                    if (redis.exists(key.getBytes()))
                        bytekeys.add(key.getBytes());
                }
                if (strkeys.size() > 0)
                    redis.del(strkeys.toArray(new String[strkeys.size()]));
                if (bytekeys.size() > 0)
                    redis.del(bytekeys.toArray(new byte[bytekeys.size()][]));
            }
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 保存对象
     *
     * @param key
     * @param obj
     */
    public static void setObject(String key, Serializable obj) {
        boolean broken = false;
        Jedis redis = RedisPool.getRedis();
        try {
            redis.set(key.getBytes(), serialize(obj));
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 保存对象
     *
     * @param key
     * @param obj      对象
     * @param setType  保存方式
     * @param timeType 过期方式
     * @param time     过期时间
     */
    public static void setObject(String key, Serializable obj, SetType setType, TimeType timeType, long time) {
        boolean broken = false;
        Jedis redis = RedisPool.getRedis();
        try {
            redis.set(key.getBytes(), serialize(obj), setType.getValue().getBytes(), timeType.getValue().getBytes(), time);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 获取对象
     *
     * @param key
     * @return
     */
    public static Object getObject(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            return deserialize(redis.get(key.getBytes()));
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
            return null;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 把对象插入到链表尾部
     *
     * @param key
     * @param objs
     */
    public static void rpushObject(String key, Serializable... objs) {
        if (objs == null || objs.length == 0)
            return;
        else {
            List<byte[]> bytes = new ArrayList<byte[]>();
            for (Serializable obj : objs) {
                bytes.add(serialize(obj));
            }
            Jedis redis = RedisPool.getRedis();
            boolean broken = false;
            try {
                redis.rpush(key.getBytes(), bytes.toArray(new byte[objs.length][]));
            } catch (Exception e) {
                e.printStackTrace();
                broken = true;
            } finally {
                if (redis != null)
                    RedisPool.returnRidesTuResource(redis, broken);
            }
        }
    }

    /**
     * 移除并返回链表头部的一个对象
     *
     * @param key
     */
    public static Object getLinkObject(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        byte[] result = null;
        try {
            result = redis.get(key.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
        return result == null ? null : deserialize(result);
    }

    /**
     * 获取链表长度
     *
     * @param key
     * @return
     */
    public static Long getLinkTableLength(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            return redis.llen(key);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
            return 0l;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 把String值插入到链表尾部
     *
     * @param key
     * @param strings
     */
    public static void rpushString(String key, String... strings) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            if (strings == null || strings.length == 0)
                return;
            redis.rpush(key, strings);
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 移除并返回链表头部的一个String 类型对象
     *
     * @param key
     */
    public static String getLinkString(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            return redis.lpop(key);
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
            return null;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 判断redis是否存在key
     *
     * @param key
     * @return
     */
    public static boolean existKey(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            if (redis.exists(key)) {
                return true;
            } else {
                return redis.exists(key.getBytes());
            }
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
            return false;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * obj对象转Base64字符串
     *
     * @param obj
     * @return
     */
    public static String ObjectToBase64String(Serializable obj) {
        byte[] bytes = null;
        ByteArrayOutputStream bo = null;
        ObjectOutputStream oo = null;
        try {
            //object to bytearray
            bo = new ByteArrayOutputStream();
            oo = new ObjectOutputStream(bo);
            oo.writeObject(obj);
            bytes = bo.toByteArray();
            bo.close();
            oo.close();
        } catch (Exception e) {
            System.out.println("translation" + e.getMessage());
            e.printStackTrace();
        } finally {
            if (oo != null)
                try {
                    oo.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            if (bo != null)
                try {
                    bo.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
        return Base64.encodeBase64String(bytes);
    }

    /**
     * base64字符串转对象
     *
     * @param str64
     * @return
     */
    public static Object Base64StringToObject(String str64) {
        Object obj = null;
        ByteArrayInputStream bi = null;
        ObjectInputStream oi = null;
        byte[] bytes = Base64.decodeBase64(str64);
        try {
            bi = new ByteArrayInputStream(bytes);
            oi = new ObjectInputStream(bi);
            obj = oi.readObject();
        } catch (Exception e) {
            System.out.println("translation" + e.getMessage());
            e.printStackTrace();
        } finally {
            if (oi != null)
                try {
                    oi.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            if (bi != null)
                try {
                    bi.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
        return obj;
    }

    /**
     * 模糊查询keys
     *
     * @return
     */
    public static Set<String> getKeys(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            return redis.keys(key);
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
            return new HashSet<String>();
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 模糊查询byte[] keys
     *
     * @return
     */
    public static Set<byte[]> getByteKeys(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            key = key.endsWith("*") ? key : key + "*";
            return redis.keys(key.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
            return new HashSet<byte[]>();
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 模糊查询byte[] keys  在将其转化成String
     *
     * @return
     */
    public static Set<String> getByteKeysToString(String key) {
        Set<byte[]> bytekeys = getByteKeys(key);
        Set<String> result = new HashSet<String>();
        if (bytekeys != null && bytekeys.size() > 0) {
            Iterator<byte[]> iter = bytekeys.iterator();
            while (iter.hasNext()) {
                result.add(new String(iter.next()));
            }
        }
        return result;
    }

    /**
     * 序列化
     *
     * @param object
     * @return
     */
    public static byte[] serialize(Object object) {

        byte[] result = null;

        if (object == null) {
            return new byte[0];
        }
        try {
            ByteArrayOutputStream byteStream = new ByteArrayOutputStream(128);
            try {
                if (!(object instanceof Serializable)) {
                    throw new IllegalArgumentException(" requires a Serializable payload " +
                            "but received an object of type [" + object.getClass().getName() + "]");
                }
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteStream);
                objectOutputStream.writeObject(object);
                objectOutputStream.flush();
                result = byteStream.toByteArray();
            } catch (Throwable ex) {
                throw new Exception("Failed to serialize", ex);
            }
        } catch (Exception ex) {
        }
        return result;
    }

    /**
     * 反序列化
     *
     * @param bytes
     * @return
     */
    public static Object deserialize(byte[] bytes) {

        Object result = null;

        if (bytes == null || bytes.length == 0) {
            return null;
        }

        try {
            ByteArrayInputStream byteStream = new ByteArrayInputStream(bytes);
            try {
                ObjectInputStream objectInputStream = new ObjectInputStream(byteStream);
                try {
                    result = objectInputStream.readObject();
                } catch (ClassNotFoundException ex) {
                    throw new Exception("Failed to deserialize object type", ex);
                }
            } catch (Throwable ex) {
                throw new Exception("Failed to deserialize", ex);
            }
        } catch (Exception e) {
        }
        return result;
    }

    /**
     * 获取redis服务器时间
     *
     * @return
     */
    public static Date getReidsTime() {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            List<String> list = redis.time();
            if (list != null && list.size() > 0) {
                return new Date(Long.parseLong(list.get(0)) * 1000);
            } else {
                return new Date();
            }
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
            return new Date();
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 往集合添加一个元素
     *
     * @param key
     * @param value
     */
    public static void addSetValue(String key, String... value) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            redis.sadd(key, value);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * redis 获得一个集合
     *
     * @param key
     * @return
     */
    public static Set<String> getSetValue(String key) {
        boolean broken = false;
        Jedis redis = RedisPool.getRedis();
        Set<String> set = null;
        try {
            set = redis.smembers(key);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
        return (set == null || set.isEmpty()) ? null : set;
    }

    /**
     * 获取集合中元素的数量
     *
     * @param key
     * @return
     */
    public static Long getSetCount(String key) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            return redis.scard(key);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
            return 0l;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }


    /**
     * 将一个元素从一个集合移动到另一个集合
     *
     * @param value
     */
    public static void moveValueFromSetToSet(String keySource, String keyTarget, String value) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            redis.smove(keySource, keyTarget, value);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * 将一个元素从一个集合移动到另一个集合
     *
     * @param value
     */
    public static void deleteSetValue(String key, String value) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            redis.srem(key, value);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * set一个hash元素值
     *
     * @param key
     * @param value
     */
    public static void setHashValue(String key, String filed, String value) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            redis.hset(key, filed, value);
        } catch (Exception e) {
            e.printStackTrace();
            broken = true;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }

    /**
     * redis 获得一个hash元素值
     *
     * @param key
     * @return
     */
    public static String getHashValue(String key, String filed) {
        Jedis redis = RedisPool.getRedis();
        boolean broken = false;
        try {
            return redis.hget(key, filed);
        } catch (Exception e) {
            e.printStackTrace();
            broken = false;
            return null;
        } finally {
            if (redis != null)
                RedisPool.returnRidesTuResource(redis, broken);
        }
    }
}
