package moim.place.controller;

import java.util.List;
import jcf.sua.mvc.MciRequest;
import jcf.sua.mvc.MciResponse;
import moim.place.model.PlacePaging;
import moim.place.model.Place;
import moim.place.model.PlaceUsed;
import moim.place.service.PlaceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PlaceController {

	@Autowired
	private PlaceService pla_service;

	/**
	 * 공간을 생성할 때 사용하는 메소드
	 */
	@RequestMapping("/place/createPlace")
	public void createPlace(MciRequest request, MciResponse response)
	{
		Place place = request.getParam(Place.class);
		pla_service.insertPlace(place);
		response.addSuccessMessage("공간이생성됨");
	}

	/**
	 * 공간을 삭제할 때 사용하는 메소드
	 */
	@RequestMapping("/place/deletePlace")
	public void deletePlace(MciRequest request, MciResponse response)
	{
		String id = request.getParam("plaId");

		pla_service.deletePlace(id);

		response.addSuccessMessage("공간삭제됨");
	}

	/**
	 * 공간을 수정할 때 사용하는 메소드
	 */
	@RequestMapping("/place/updatePlace")
	public void updatePlace(MciRequest request, MciResponse response)
	{
		Place place = request.getParam(Place.class);
		pla_service.updatePlace(place);
		response.addSuccessMessage("공간이수정됨");
	}

	/**
	 * 공간을 조회할 때 사용하는 메소드
	 */
	@RequestMapping("/place/getPlace")
	public void getPlace(MciRequest request, MciResponse response){

		String plaId = request.getParam("pla_Id");
		List<Place> pla_list = pla_service.getPlace(plaId);

		response.setList("MOIM_Place", pla_list);
	}

	/**
	 * 페이지 단위로 목록 조회
	 */
	@RequestMapping("/place/getPagePlace")
	public void paging(MciRequest request, MciResponse response)
	{
		final int ARTICLESPERPAGE = 5;

		//String id = request.getParam("id");
		String page = request.getParam("page");

/*		String id = "4";
		String page = "1";*/

		int startNo = (ARTICLESPERPAGE * (Integer.parseInt(page) - 1)) + 1;
		int endNo = (ARTICLESPERPAGE * Integer.parseInt(page));

		PlacePaging paging = new PlacePaging();
		paging.setPlaStart(startNo);
		paging.setPlaEnd(endNo);

		List<Place> page_list = pla_service.getPagePlace(paging);

		response.setList("PAGE", page_list);
	}

	/**
	 * 공간 사용 테이블 select
	 * input : date, pla_id
	 */
	@RequestMapping("/place/getPlaceUsed")
	public void getPlaceUsed(MciRequest request, MciResponse response)
	{
		PlaceUsed placeUsed = request.getParam(PlaceUsed.class);

		List<PlaceUsed> used_list = pla_service.getUsedPlace(placeUsed);

		response.setList("USEDPLACE",used_list);
	}

	/**
	 * 공간 선택 취소했을 경우 데이터 삭제 메소드
	 */
	@RequestMapping("/place/deletePlaceUsed")
	public void deletePlaceused(MciRequest request, MciResponse response)
	{
		PlaceUsed placeUsed = request.getParam(PlaceUsed.class);

	/*	placeUsed.setPlaId(request.getParam("plaId"));
		placeUsed.setUsedDate(request.getParam("usedDate"));
		placeUsed.setUsedId(request.getParam("usedId"));
		placeUsed.setUsedTime(request.getParam("usedTime"));
		placeUsed.setMeeId(request.getParam("meeId"));*/

		pla_service.deletePlaceused(placeUsed);

		response.addSuccessMessage("DeletePlaceUsed Sussess!!");
	}

	/**
	 * 공간 사용 insert 메소드
	 */
	@RequestMapping("/place/insertPlaceUsed")
	public void insertPlaceused(MciRequest request, MciResponse response)
	{
		PlaceUsed placeUsed = request.getParam(PlaceUsed.class);

		pla_service.insertPlaceused(placeUsed);

		response.addSuccessMessage("insertPlaceused Sussess!!");

	}


	/**
	 * 모임에 대한 모임 일정 알려주기
	 */
	@RequestMapping("/place/getPlan")
	public void getPlan(MciRequest request, MciResponse response)
	{
		String meeId = request.getParam("meeId");

		List<PlaceUsed> used_list = pla_service.getPlan(meeId);

		response.setList("MEETTIME", used_list);



	}
}
