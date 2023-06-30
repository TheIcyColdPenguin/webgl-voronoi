use js_sys::Math::{fround, random};
use wasm_bindgen::prelude::wasm_bindgen;

use crate::webgl_manager::WebglManager;

#[wasm_bindgen]
pub struct App {
    webgl_manager: WebglManager,

    width: f32,
    height: f32,

    points: Vec<f32>,
}

#[wasm_bindgen]
impl App {
    pub fn new(webgl_manager: WebglManager, width: f32, height: f32, num_points: u32) -> App {
        let points = Self::generate_points(width, height, num_points);

        App {
            webgl_manager,

            width,
            height,

            points,
        }
    }

    fn generate_points(width: f32, height: f32, num_points: u32) -> Vec<f32> {
        let aspect_ratio = width / height;

        (0..(num_points * 2))
            .into_iter()
            .flat_map(|_| {
                [
                    fround(random()) * 2.0 * aspect_ratio - aspect_ratio,
                    fround(random() * 2.0 - 1.0),
                ]
            })
            .collect()
    }

    pub fn update(&mut self, u_time: f32) {
        const MULT: f64 = 0.005;
        const SUB: f64 = MULT / 2.0;
        for point in self.points.iter_mut() {
            *point = *point + fround(random() * MULT - SUB);
        }
    }

    pub fn draw(&mut self, u_time: f32) {
        self.webgl_manager
            .draw_frame(u_time, self.width, self.height, &self.points);
    }

    pub fn resize(&mut self, width: f32, height: f32) {
        self.width = width;
        self.height = height;
    }
}
