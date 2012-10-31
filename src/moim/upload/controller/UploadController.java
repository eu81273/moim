package moim.upload.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import moim.upload.model.UploadItem;

import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UploadController
{
	@Inject
	private FileSystemResource fsResource;

	@RequestMapping("/upload")
	public void create(UploadItem uploadItem, BindingResult result, HttpServletRequest request, HttpServletResponse response)
	{
		String fileName = "";

		if(result.hasErrors())
		{
			for(ObjectError error : result.getAllErrors())
			{
				System.out.println("Error: " + error.getCode() + " - " + error.getDefaultMessage());
			}

			// 오류 상황..
		}
		System.out.println(uploadItem.getFileData());
		if(!uploadItem.getFileData().isEmpty())
		{
			String filename = uploadItem.getFileData().getOriginalFilename();
			String imgExt = filename.substring(filename.lastIndexOf(".") + 1, filename.length());

			// upload 가능한 파일 타입 지정
			if(imgExt.equalsIgnoreCase("JPG") || imgExt.equalsIgnoreCase("JPEG") || imgExt.equalsIgnoreCase("GIF") || imgExt.equalsIgnoreCase("PNG"))
			{
				byte[] bytes = uploadItem.getFileData().getBytes();
				try
				{
					fileName = createMD5(String.valueOf(System.currentTimeMillis())) + "." + imgExt;
					File file = new File(fsResource.getPath() + fileName);
					FileOutputStream fileOutputStream = new FileOutputStream(file);
					fileOutputStream.write(bytes);
					fileOutputStream.close();
				}
				catch(IOException ie)
				{
					// Exception 처리
					System.err.println("File writing error! ");
				}
				System.err.println("File upload success! ");
			}
			else
			{
				System.err.println("File type error! ");
			}
		}

		// Some type of file processing...
		System.err.println("-------------------------------------------");
		System.err.println("서버 상의 파일명: " + fileName);
		System.err.println("원래 파일명: " + uploadItem.getFileData().getOriginalFilename());
		System.err.println("-------------------------------------------");

		response.setContentType("application/json+sua; charset=utf-8"); //출력할 페이지의 인코딩을 설정
		try
		{
			PrintWriter out = response.getWriter();
			out.write("{ \"FILE\" : [ {	\"fileName\" : \"" + fileName + "\"	} ] }");
		}
		catch(IOException e)
		{
			e.printStackTrace();
		}
	}

	public String createMD5(String str)
	{
		String MD5 = "";
		try
		{
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(str.getBytes());
			byte byteData[] = md.digest();
			StringBuffer sb = new StringBuffer();
			for(int i = 0; i < byteData.length; i++)
			{
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
			}
			MD5 = sb.toString();

		}
		catch(NoSuchAlgorithmException e)
		{
			e.printStackTrace();
			MD5 = null;
		}
		return MD5;
	}

}