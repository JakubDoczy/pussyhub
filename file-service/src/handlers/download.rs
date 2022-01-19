use crate::ApplicationData;
use actix_files::NamedFile;
use actix_web::{web, HttpRequest, Result};
use crate::file_paths::get_folder;

pub(crate) async fn handle_download(
    _app_data: web::Data<ApplicationData>,
    req: HttpRequest,
) -> Result<NamedFile> {
    let filename: &str = req.match_info().query("filename");
    let username: &str = req.match_info().query("username");

    let folder = match get_folder(username) {
        Ok(path) => path,
        Err(e) => {
            return Err(actix_web::error::ErrorNotFound(format!("{:?}", e)));
        }
    };

    Ok(NamedFile::open(folder.join(filename))?)
}
