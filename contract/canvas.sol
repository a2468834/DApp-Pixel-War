// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;

// Constants and custom error
uint256 constant dim  = 15 * 15;
uint256 constant dim1 = 15;
uint256 constant dim2 = 15;
error Failed(string error_msg);

contract Canvas {
    uint256[dim] private draw_time;
    bytes3[dim]  private canvas;
    
    event Draw(address indexed painter, uint32 indexed index, bytes3 color);
    
    function draw(uint8 index, bytes3 color) external {
        if(!isPaintable(index)) {
            revert Failed("Each pixel needs 5 minutes cooldown.");
        }
        
        canvas[index] = color;
        draw_time[index] = block.timestamp;
        
        emit Draw(msg.sender, index, color);
    }
    
    function getCanvas() external view returns (bytes3[] memory) {
        bytes3[] memory _canvas = new bytes3[](dim);
        
        for(uint8 i = 0; i < dim; i++) 
            _canvas[i] = canvas[i];
        
        return _canvas;
    }
    
    function isPaintable(uint32 index) public view returns (bool) {
        if((block.timestamp - draw_time[index]) > 5 minutes) 
            return true;
        else 
            return false;
    }
}