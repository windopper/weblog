use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

// 기본 forloop 함수
#[wasm_bindgen]
pub fn forloop(n: u32) -> u32 {
    let mut sum = 0;
    for _i in 0..n {
        sum += 1;
    }
    sum
}

// 더 복잡한 계산을 위한 함수
#[wasm_bindgen]
pub fn complex_calculation(n: u32) -> u64 {
    let mut result: u64 = 0;
    for i in 0..n {
        result += (i as u64) * (i as u64);
    }
    result
}

// 메모리 할당이 많은 함수
#[wasm_bindgen]
pub fn memory_intensive(n: u32) -> u32 {
    let mut vec = Vec::with_capacity(n as usize);
    for i in 0..n {
        vec.push(i);
    }
    vec.iter().sum()
}

// 부동소수점 계산 함수
#[wasm_bindgen]
pub fn float_calculation(n: u32) -> f64 {
    let mut sum = 0.0;
    for i in 0..n {
        sum += (i as f64).sqrt();
    }
    sum
}

// 문자열 처리 함수
#[wasm_bindgen]
pub fn string_processing(n: u32) -> u32 {
    let mut total_length = 0;
    for i in 0..n {
        let s = format!("number_{}", i);
        total_length += s.len() as u32;
    }
    total_length
}

// 조건부 분기 함수
#[wasm_bindgen]
pub fn conditional_loop(n: u32) -> u32 {
    let mut count = 0;
    for i in 0..n {
        if i % 2 == 0 {
            count += i;
        } else {
            count += i * 2;
        }
    }
    count
}