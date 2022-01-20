use std::ops::Deref;
use std::path::{Path, PathBuf};
use anyhow::{Error, bail};
use shared_lib::token_validation::SlimUser;
use tokio::fs;

const ROOT_UPLOAD_FOLDER: &str = "files";

pub async fn ensure_folder(owner: &SlimUser) -> Result<PathBuf, Error> {
    let total_folder_path = Path::new(&ROOT_UPLOAD_FOLDER).join(&owner.username);
    fs::create_dir_all(&total_folder_path).await?;
    Ok(total_folder_path)
}

pub fn get_folder(username: &str) -> Result<PathBuf, Error> {
    let total_folder_path = Path::new(&ROOT_UPLOAD_FOLDER).join(username);
    if total_folder_path.exists() {
        Ok(total_folder_path)
    } else {
        bail!("File path does not exist!")
    }
}









